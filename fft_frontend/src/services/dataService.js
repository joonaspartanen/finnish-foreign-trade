import axios from 'axios'

const getImports = async year => {
  const response = await axios.get(`/imports/${year}`)
  return response.data
}

const getExports = async year => {
  const response = await axios.get(`/exports/${year}`)
  return response.data
}

const getTradeBalance = async () => {
  const response = await axios.get('/tradebalance')
  return response
}

const getSitc2Data = async (year, flow) => {
  const response = await axios.get(`/SITC2/${flow}/${year}`)
  return response
}

const getSitc2CountryData = async (flow, year, country) => {
  const response = await axios.get(`/SITC2/${flow}/${year}/${country[0].code}`)
  return response
}

const getCountryCodes = async () => {
  const response = await axios.get('/countries')
  return response
}

export default {
  getImports,
  getExports,
  getTradeBalance,
  getSitc2Data,
  getSitc2CountryData,
  getCountryCodes
}
