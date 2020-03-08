import axios from 'axios'

const getImports = async year => {
  const response = await axios.get(`/imports/${year}`)
  return response
}

const getExports = async year => {
  const response = await axios.get(`/exports/${year}`)
  return response
}

const getTradeBalance = async () => {
  const response = await axios.get('/tradebalance')
  return response
}

const getSITC2Data = async (year, flow) => {
  const response = await axios.get(`/SITC2/${flow}/${year}`)
  return response
}

const getSITC2CountryData = async (flow, country) => {
  const response = await axios.get(`/SITC2/${flow}/${country[0].code}`)
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
  getSITC2Data,
  getSITC2CountryData,
  getCountryCodes
}
