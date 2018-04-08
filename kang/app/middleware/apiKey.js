var { User } = require('../model');

exports.apiKey = async (req, res, next) => {
  const token = req.headers['token'];
  if(!token) {
    res.send(400, 'token required');
    return;
  }

  const user = await User.where({token: token}).fetch();
  
  if(!user) {
    res.send(400, 'Invalid api key');
    return
  } else {
    req['api'] = user;
    await next();
  }
  
}