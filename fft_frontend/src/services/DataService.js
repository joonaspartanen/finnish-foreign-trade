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

const getProductData = async () => {
  const response = await axios.get('/SITC1')
  return response
}

const getImportsSITC2 = async () => {
  const response = await axios.get('/SITC2')
  return response
}

export default {
  getImports,
  getExports,
  getTradeBalance,
  getProductData,
  getImportsSITC2
}
