const tradeDataRouter = require('express').Router()
const dataService = require('../services/dataService')

tradeDataRouter.get('/imports', async (req, res) => {
  const classifiedImports = await dataService.getClassifiedTradeData()
  res.json(classifiedImports)
})

tradeDataRouter.get('/exports', async (req, res) => {
  const classifiedExports = await dataService.getClassifiedTradeData()
  res.json(classifiedExports)
})

tradeDataRouter.get('/tradebalance', async (req, res) => {
  const tradeBalanceData = await dataService.getTradeBalanceData()
  res.json(tradeBalanceData)
})

tradeDataRouter.get('/SITC1', async (req, res) => {
  const SITC1Data = await dataService.getSITC1Data()
  res.json(SITC1Data)
})

tradeDataRouter.get('/SITC2/imports', async (req, res) => {
  const SITC2Data = await dataService.getSITC2Data(1)
  res.json(SITC2Data)
})

tradeDataRouter.get('/SITC2/exports', async (req, res) => {
  const SITC2Data = dataService.getSITC2Data(2)
  res.json(SITC2Data)
})

tradeDataRouter.get('/SITC2/:country', async (req, res) => {
  // TODO: Extract business logic
  const country = req.params.country
  const imports = await dataService.getData(
    'SITC2',
    '=ALL',
    country,
    '2018',
    '1'
  )
  const sortedData = imports
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .sort((a, b) => b.vals - a.vals)
  res.json(sortedData)
})

module.exports = tradeDataRouter
