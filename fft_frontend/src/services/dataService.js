import axios from 'axios'

const getImports = async () => {
  const response = await axios.get('/imports')
  return response
}

const getExports = async () => {
  const response = await axios.get('/exports')
  return response
}

const getTradeBalance = async () => {
  const response = await axios.get('/tradebalance')
  return response
}

const getSITC2Data = async flow => {
  const response = await axios.get(`/SITC2/${flow}`)
  return response
}

export default {
  getImports,
  getExports,
  getTradeBalance,
  getSITC2Data
}
