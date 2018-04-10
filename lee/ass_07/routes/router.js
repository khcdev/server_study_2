const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
let controller = require('../controller/controller');

router.route('/join')
.post(controller.joinMain);

router.route('/login')
.get(controller.loginMain)
.post(controller.loginCheck);

router.route('/user')
.get(controller.userCheck);

router.route('/upload')
.get(controller.uploadMain);
//.post(controller.uploadPage);

module.exports = router;