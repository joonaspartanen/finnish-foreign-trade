const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json())

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
    const response = await axios.get(`http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&Classification+of+Products+SITC1=0-9`, {

      params: {
        Country: country,
        Year: year,
        Flow: '1',
        Indicators: 'V1'
      }
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

app.get('/imports', async (req, res) => {
  const imports = await getData("=ALL", "2018")
  console.log(imports)
  res.send(imports)
})

app.get('/countries', async (req, res) => {
  const countries = await axios.get('http://uljas.tulli.fi/uljas/graph/api.aspx?lang=fi&atype=class&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC')
  res.send(countries.data)
})

const PORT = 3003
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)
})