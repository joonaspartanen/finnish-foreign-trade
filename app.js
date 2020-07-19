const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const tradeDataRouter = require('./controllers/tradeData')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/', tradeDataRouter)

module.exports = app
