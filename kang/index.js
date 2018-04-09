const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const router = require('./router')
const hostname = '0.0.0.0'

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

app.use('/api', router)

app.listen(8080, '0.0.0.0', () => console.log('Example app listening on port 8080!'))
