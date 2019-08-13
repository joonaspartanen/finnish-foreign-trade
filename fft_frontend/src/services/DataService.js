import axios from 'axios'

const getImports = async () => {
  const response = await axios.get('/imports')
  //console.log(response)
  return response
}

const mapData = (data) => {
  return data.map(a => ({ id: a.keys[1].substring(0, 2), value: a.vals[0] }))
}

export default { getImports, mapData }