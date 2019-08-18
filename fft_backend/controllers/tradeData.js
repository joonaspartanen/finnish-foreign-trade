const tradeDataRouter = require('express').Router()
const dataUtils = require('../utils/dataUtils')

tradeDataRouter.get('/imports', async (req, res) => {
  const data = await dataUtils.getData('0-9', '=ALL', '2018', '1')
  const mappedData = dataUtils.mapData(data)
  const classifiedData = dataUtils.classifyData(mappedData)
  res.json(classifiedData)
})

tradeDataRouter.get('/exports', async (req, res) => {
  const data = await dataUtils.getData('0-9', '=ALL', '2018', '2')
  const mappedData = dataUtils.mapData(data)
  const classifiedData = dataUtils.classifyData(mappedData)
  res.json(classifiedData)
})

tradeDataRouter.get('/tradebalance', async (req, res) => {
  const imports = await dataUtils.getData('0-9', 'AA', '=ALL', '1')
  const exports = await dataUtils.getData('0-9', 'AA', '=ALL', '2')
  res.json(dataUtils.parseTradeBalance(imports, exports))
})

tradeDataRouter.get('/imports/SITC1', async (req, res) => {
  const data = await dataUtils.getData('=ALL', 'AA', '2018', '1')
  const sortedData = data
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ year: parseInt(a.keys[2]), class: a.keys[0].substring(12), euros: a.vals[0] }))
    .sort((a, b) => b.euros - a.euros)
  res.json(sortedData)
})

tradeDataRouter.get('/exports/SITC1', async (req, res) => {
  const data = await dataUtils.getData('=ALL', 'AA', '2018', '2')
  const sortedData = data
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ year: parseInt(a.keys[2]), class: a.keys[0].substring(12), euros: a.vals[0] }))
    .sort((a, b) => b.euros - a.euros)
  res.json(sortedData)
})

module.exports = tradeDataRouter