const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const tradeDataRouter = require('./routes/tradeData')
const countryRouter = require('./routes/countries')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/', tradeDataRouter)
app.use('/countries', countryRouter)

module.exports = app
