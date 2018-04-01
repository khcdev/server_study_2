const router = require('express').Router();
const { userLogin } = require('../controller/user_controller');


router.route('/logintest')
.post(userLogin);

module.exports = router;