const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())

// const http = require('http')
// const config = require('./utils/config')

// const server = http.createServer(app)

/**  server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
}) **/

// Palauttaa maat::
// http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=class&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&class=Country

// Palauttaa indicators:
// http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=class&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&class=Indicators


const getData = async (country, year) => {
  try {
    const testData = await axios.get(`http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&Classification+of+Products+SITC1=0-9`, {

      params: {
        // Classification%of%20Products%20SITC1': '0-9',
        Country: country,
        Year: year,
        Flow: '1',
        Indicators: 'V1'
      }
    })

    console.log(testData.data)
    return testData.data
  } catch (error) {
    console.log(error)
  }
}

app.get('/values', async (req, res) => {
  const testData = await getData('=ALL', '2018')
  res.send(testData)
})

const PORT = 3003
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)
})