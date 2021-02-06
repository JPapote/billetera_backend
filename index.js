const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8080
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./router'))

app.listen(port, () => console.log(`Escuchando puerto, ${port}`))