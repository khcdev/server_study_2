const router = require('express').Router()
const { authBasic, register } = require('./app/controller/auth')
const { boardWrite, boardAll, board } = require('./app/controller/board')

router.post('/basicAuth', authBasic);
router.post('/register', register);
router.post('/board', boardWrite);
router.get('/board', boardAll);
router.get('/board/:id', board);

module.exports = router