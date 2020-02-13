const axios = require('axios')
const baseUrl =
  'http://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC'
const utils = require('../utils/utils')

const getData = async (SITC, classification, country, year, flow) => {
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

  if (SITC === 'SITC1') {
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
  } else if (SITC === 'SITC2') {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          'Classification of Products SITC2': classification,
          Country: country,
          Year: year,
          Flow: flow,
          Indicators: 'V1',
          Exclude: 'ZAN'
        }
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}

const mapData = data => {
  return data
    .map(a => ({
      id: a.keys[1].substring(0, 2),
      year: parseInt(a.keys[2]),
      euros: a.vals[0]
    }))
    .filter(a => a.id !== 'AA')
    .map(a =>
      // Serbian country code must be changed
      a.id === 'XS' ? { ...a, id: 'RS' } : a
    )
}

const classifyData = data => {
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

const getClassifiedTradeData = async () => {
  const data = await getData('SITC1', '0-9', '=ALL', '2018', '2')
  const mappedData = mapData(data)
  const classifiedData = classifyData(mappedData)
  return classifiedData
}

const getTradeBalanceData = async () => {
  const imports = await getData('SITC1', '0-9', 'AA', '=FIRST*;10', '1')
  const exports = await getData('SITC1', '0-9', 'AA', '=FIRST*;10', '2')
  const mappedImports = imports.map(a => ({
    year: parseInt(a.keys[2]),
    imports: a.vals[0]
  }))
  const mappedExports = exports.map(a => ({
    year: parseInt(a.keys[2]),
    exports: a.vals[0]
  }))
  const combinedData = mappedImports.map((a, i) => ({
    ...a,
    exports: mappedExports[i].exports
  }))
  const result = combinedData.map(a => ({
    ...a,
    tradeBalance: a.exports - a.imports
  }))
  return result.sort((a, b) => b.year - a.year)
}

const getSITC1Data = async () => {
  const imports = await getData('SITC1', '=ALL', 'AA', '2018', '1')
  const exports = await getData('SITC1', '=ALL', 'AA', '2018', '2')
  const mappedImports = imports
    .sort((a, b) => b.vals - a.vals)
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ [a.keys[0].substring(12)]: a.vals[0] }))
  const mappedExports = exports
    .sort((a, b) => b.vals - a.vals)
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ [a.keys[0].substring(12)]: a.vals[0] }))
  const finalImports = Object.assign({ flow: 'Imports' }, ...mappedImports)
  const finalExports = Object.assign({ flow: 'Exports' }, ...mappedExports)

  const result = []
  result.push(finalImports, finalExports)
  return result
}

const getSITC2Data = async flow => {
  const SITC2Array = utils.initializeSITC2Array()
  const data = await getData('SITC2', '=ALL', 'AA', '2018', flow)
  const mappedData = mapDataForSITC2(data)
  mappedData.map(a => {
    SITC2Array[a.SITC1].children.push(a)
  })
  return SITC2Array
}

const mapDataForSITC2 = data => {
  return data
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({
      group: a.keys[0].substring(13),
      value: a.vals[0],
      SITC1: parseInt(a.keys[0].substring(0, 1))
    }))
    .sort((a, b) => a.SITC1 - b.SITC1)
}

module.exports = {
  getData,
  mapData,
  classifyData,
  getTradeBalanceData,
  getClassifiedTradeData,
  getSITC1Data,
  getSITC2Data
}
