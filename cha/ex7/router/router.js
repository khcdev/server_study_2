const router = require('express').Router();
const { userLogin, newUser } = require('../controller/user_controller');
const { uploadImage } = require('../controller/image_controller');

const bodyParser = require('body-parser');
router.use('/login',bodyParser.urlencoded({extended: false}));
router.use('/account',bodyParser.urlencoded({extended: false}));



// route
router.route('/login')
.post(userLogin);

router.route('/account')
.post(newUser)
module.exports = router;

