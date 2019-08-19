const axios = require('axios')
const baseUrl = 'http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC'

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
  return result.sort((a, b) => b.year - a.year)
}

module.exports = { getData, mapData, classifyData, parseTradeBalance }