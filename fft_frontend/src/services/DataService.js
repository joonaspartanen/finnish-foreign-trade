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
  const response = await axios.get('/tradebalance/FI')
  return response
}


export default { getImports, getExports, getTradeBalance }