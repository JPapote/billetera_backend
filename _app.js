const express = require('express')
require('dotenv/config')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./routers/router'))

module.exports = {
    app
}