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

const getImportsBySITC = async () => {
  const response = await axios.get('/imports/SITC1')
  return response
}

const getExportsBySITC = async () => {
  const response = await axios.get('/exports/SITC1')
  return response
}


export default {
  getImports,
  getExports,
  getTradeBalance,
  getImportsBySITC,
  getExportsBySITC
}