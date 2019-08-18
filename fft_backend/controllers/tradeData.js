const tradeDataRouter = require('express').Router()

const axios = require('axios')

const baseUrl = 'http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC'

// Palauttaa maat::
// http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=class&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&class=Country

// Palauttaa indicators:
// http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=class&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&class=Indicators

// Palauttaa 2018 viennin tuotekoodeittain:
// http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC&Classification%20of%20Products%20SITC3==ALL&Country=AA&Year=2018&Flow=2&Indicators=V1

const getData = async (classification, country, year, flow) => {

  axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
      try {
        const parsedData = JSON.parse(res.data.slice(1))
        res.data = parsedData
      } catch (e) {
        console.log(e)
      }
    }
    return res
  })

  try {
    const response = await axios.get(baseUrl, {

      params: {
        'Classification of Products SITC1': classification,
        Country: country,
        Year: year,
        Flow: flow,
        Indicators: 'V1'
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const mapData = (data) => {
  return data
    .map(a => ({ id: a.keys[1].substring(0, 2), year: parseInt(a.keys[2]), euros: a.vals[0] }))
    .filter(a => a.id !== "AA")
    .map(a =>
      // Serbian country code must be changed
      a.id === "XS"
        ? { ...a, id: "RS" }
        : a)
}

const classifyData = (data) => {
  return data.map(a => {
    let c = 1
    if (a.euros >= 5000000000) {
      c = 6
    } else if (a.euros >= 1000000000 && a.euros < 5000000000) {
      c = 5
    } else if (a.euros >= 100000000 && a.euros < 1000000000) {
      c = 4
    } else if (a.euros >= 10000000 && a.euros < 100000000) {
      c = 3
    } else if (a.euros >= 1000000 && a.euros < 10000000) {
      c = 2
    } else if (a.euros < 1000000) {
      c = 1
    }
    return { ...a, value: c }
  })
}

const parseTradeBalance = (imports, exports) => {
  const mappedImports = imports
    .map(a => ({ year: parseInt(a.keys[2]), imports: a.vals[0] }))
  const mappedExports = exports
    .map(a => ({ year: parseInt(a.keys[2]), exports: a.vals[0] }))
  const combinedData = mappedImports
    .map((a, i) => ({ ...a, exports: mappedExports[i].exports }))
  const result = combinedData.map(a => ({ ...a, tradeBalance: a.exports - a.imports }))
  return result.sort((a, b) => a.year - b.year)
}

tradeDataRouter.get('/imports', async (req, res) => {
  const data = await getData('0-9', '=ALL', '2018', '1')
  const mappedData = mapData(data)
  const classifiedData = classifyData(mappedData)
  res.json(classifiedData)
})

tradeDataRouter.get('/exports', async (req, res) => {
  const data = await getData('0-9', '=ALL', '2018', '2')
  const classifiedData = classifyData(mapData(data))
  res.json(classifiedData)
})

tradeDataRouter.get('/tradebalance', async (req, res) => {
  const imports = await getData('0-9', 'AA', '=ALL', '1')
  const exports = await getData('0-9', 'AA', '=ALL', '2')
  res.json(parseTradeBalance(imports, exports))
})

tradeDataRouter.get('/imports/SITC1', async (req, res) => {
  const data = await getData('=ALL', 'AA', '2018', '1')
  const sortedData = data
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ year: parseInt(a.keys[2]), class: a.keys[0].substring(12), euros: a.vals[0] }))
    .sort((a, b) => b.euros - a.euros)
  res.json(sortedData)
})

tradeDataRouter.get('/exports/SITC1', async (req, res) => {
  const data = await getData('=ALL', 'AA', '2018', '2')
  const sortedData = data
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ year: parseInt(a.keys[2]), class: a.keys[0].substring(12), euros: a.vals[0] }))
    .sort((a, b) => b.euros - a.euros)
  res.json(sortedData)
})

module.exports = tradeDataRouter