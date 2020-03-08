const tradeDataRouter = require('express').Router()
const dataService = require('../services/dataService')
const { cache } = require('../utils/middleware')
const HOUR = 3600

tradeDataRouter.get('/imports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || 2019
  const classifiedImports = await dataService.getClassifiedTradeData(year, '1')
  res.json(classifiedImports)
})

tradeDataRouter.get('/exports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || 2019
  const classifiedExports = await dataService.getClassifiedTradeData(year, '2')
  res.json(classifiedExports)
})

tradeDataRouter.get('/tradebalance', cache(HOUR), async (req, res) => {
  const tradeBalanceData = await dataService.getTradeBalanceData()
  res.json(tradeBalanceData)
})

tradeDataRouter.get('/SITC1', cache(HOUR), async (req, res) => {
  const SITC1Data = await dataService.getSITC1Data()
  res.json(SITC1Data)
})

tradeDataRouter.get('/SITC2/imports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || 2019
  const SITC2Data = await dataService.getSITC2Data(year, '1')
  res.json(SITC2Data)
})

tradeDataRouter.get('/SITC2/exports/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || 2019
  const SITC2Data = await dataService.getSITC2Data(year, '2')
  res.json(SITC2Data)
})

tradeDataRouter.get('/SITC2/total/:year?', cache(HOUR), async (req, res) => {
  const year = req.params.year || 2019
  const SITC2imports = await dataService.getSITC2Data(year, '1')
  const SITC2exports = await dataService.getSITC2Data(year, '2')
  const result = {
    imports: SITC2imports,
    exports: SITC2exports
  }
  res.json(result)
})

tradeDataRouter.get('/SITC2/imports/:country', cache(HOUR), async (req, res) => {
  const country = req.params.country
  const data = await dataService.getSITC2CountryData(country, '1')
  res.json(data)
})

tradeDataRouter.get('/SITC2/exports/:country', cache(HOUR), async (req, res) => {
  const country = req.params.country
  const data = await dataService.getSITC2CountryData(country, '2')
  res.json(data)
})

tradeDataRouter.get('/countries', cache(HOUR), async (req, res) => {
  const countries = await dataService.fetchCountryCodes()
  res.json(countries)
})

module.exports = tradeDataRouter
