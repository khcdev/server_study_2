const router = require('express').Router()
const { authBasic, profile, register } = require('./app/controller/auth')
const { boardWrite ,boardAll, uploadImage, boardPager, boardDelete, board, replyWrite, replyDelete } = require('./app/controller/board')
const { apiKey } = require('./app/middleware/apiKey')

var multer  = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 10240 } });



router.post('/basicAuth', authBasic);
router.post('/register', register);
router.post('/board', apiKey, boardWrite);
router.post('/replyWrite/:id', apiKey, replyWrite);
router.post('/upload', upload.single('img'), uploadImage);

router.get('/board', apiKey, boardAll);
router.get('/board/page/:id', apiKey, boardPager);
router.get('/board/:id', apiKey, board);

router.delete('/board/:id', apiKey, boardDelete); //글삭제
router.delete('/reply/:id', apiKey, replyDelete); //
module.exports = router
