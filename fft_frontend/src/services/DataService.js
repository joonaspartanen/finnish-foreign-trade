import axios from 'axios'

const getImports = async () => {
  const response = await axios.get('/imports')
  return response
}

const getExports = async () => {
  const response = await axios.get('/exports')
  return response
}

const mapData = (data) => {
  return data
    .map(a => ({ id: a.keys[1].substring(0, 2), value: a.vals[0] }))
    .filter(a => a.id !== "AA")
}

export default { getImports, getExports, mapData }