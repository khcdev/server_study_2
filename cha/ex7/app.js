const express = require('express');
const app = express();
const multer = require('multer');

const router = require('./router/router')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file ,callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    }
})

const imgUploader =  multer({dest:'uploads/', storage: storage, limits: {fileSize: 10 * 1024 * 1024}});

app.use(router);
app.use('/api', (req, res, next) => {
    console.log(req.headers.cookie);
    next();
});
app.post('/api/image', imgUploader.single('img'), (req,res) => {
    console.log(req.file);
    res.status(200).send('img')
});

app.use((err, req, res, next)=>{
    console.error(err)
    res.status(500).send('error occured');
});

app.listen(3000, () => {
    console.log('server is running .. port : 3000')
});