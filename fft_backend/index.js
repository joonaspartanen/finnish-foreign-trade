const express = require('express')
const app = express()
const axios = require('axios')

// const http = require('http')
// const config = require('./utils/config')

// const server = http.createServer(app)

/**  server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
}) **/

const getData = async () => {
  try {
    const testData = await axios.get('http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&Classification%20of%20Products%20SITC1=0-9&Country=MX&Year==ALL;12&Flow=2&Indicators=V1')
    console.log(testData.data)
    return testData.data
  } catch (error) {
    console.log(error)
  }
}

app.get('/values', async (req, res) => {
  const testData = await getData()
  res.send(testData)
})

const PORT = 3001
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)
})