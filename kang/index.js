const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000 
const router = require('./router')  

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => console.log('Example app listening on port 3000!'))