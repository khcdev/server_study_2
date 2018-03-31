var { User } = require('../model');
var hat = require('hat').rack();

exports.authBasic = async (req, res) => {
    const { email, password } = req.body
    User.where({'email': email, 'password': password}).fetch().
    then((user) => {
        const key_duration = 3600 * 12;
        const expires_in = Math.round(Date.now() / 1000) + key_duration;
        const token = hat(expires_in);
        user.set('token', token).save();
        res.send(200, {"token": token})  
    }).catch((error) => {
        console.log(error);
        res.send(400)  
    });
}

exports.profile = async (req, res) => {
    const apiKey = req.header['x-api-key'];
    if(!apiKey) {
        res.send(400, "require api key");
    }

    const user = User.where({token: apiKey}).fetch().
    then((user) => {
        res.send(200, 'valid')
    }).catch((error)=> {
        res.send(401, "not match api key")
    })
}

exports.checkAuth = async (req, res) => {
    const apiKey = req.header['x-api-key'];

    if(!apiKey) {
        res.send(400, "require api key");
    }

    const user = User.where({token: apiKey}).fetch().
    then((user) => {
        res.send(200, 'valid')
    }).catch((error)=> {
        res.send(401, "not match api key")
    })
}

exports.register = async (req, res) => {
    const { email, password, name } = req.body
    console.log(email, password, name);
    var user = new User({
        id: null,
        name: name, 
        email: email, 
        password: password
    });

    try {
        const response = await user.save(null, { method: 'insert' });
        const key_duration = 3600 * 12;
        const expires_in = Math.round(Date.now() / 1000) + key_duration;
        const token = hat(expires_in);
        response.set('token', token).save();
        res.send(200, {"token": token})  
        
    } catch (error) {
        res.send(400, error);  
    }
}