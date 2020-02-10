const tradeDataRouter = require('express').Router()
const dataUtils = require('../utils/dataUtils')
var _ = require('lodash')

tradeDataRouter.get('/imports', async (req, res) => {
  const data = await dataUtils.getData(1, '0-9', '=ALL', '2018', '1')
  const mappedData = dataUtils.mapData(data)
  const classifiedData = dataUtils.classifyData(mappedData)
  res.json(classifiedData)
})

tradeDataRouter.get('/exports', async (req, res) => {
  const data = await dataUtils.getData(1, '0-9', '=ALL', '2018', '2')
  const mappedData = dataUtils.mapData(data)
  const classifiedData = dataUtils.classifyData(mappedData)
  res.json(classifiedData)
})

tradeDataRouter.get('/tradebalance', async (req, res) => {
  const imports = await dataUtils.getData(1, '0-9', 'AA', '=FIRST*;10', '1')
  const exports = await dataUtils.getData(1, '0-9', 'AA', '=FIRST*;10', '2')
  res.json(dataUtils.parseTradeBalance(imports, exports))
})

tradeDataRouter.get('/SITC1', async (req, res) => {
  const imports = await dataUtils.getData(1, '=ALL', 'AA', '2018', '1')
  const exports = await dataUtils.getData(1, '=ALL', 'AA', '2018', '2')
  const mappedImports = imports
    .sort((a, b) => b.vals - a.vals)
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ [a.keys[0].substring(12)]: a.vals[0] }))
  const mappedExports = exports
    .sort((a, b) => b.vals - a.vals)
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ [a.keys[0].substring(12)]: a.vals[0] }))
  const finalImports = Object.assign({ flow: 'Imports' }, ...mappedImports)
  const finalExports = Object.assign({ flow: 'Exports' }, ...mappedExports)

  const result = []
  result.push(finalImports, finalExports)
  res.json(result)
})

tradeDataRouter.get('/SITC2', async (req, res) => {
  const imports = await dataUtils.getData(2, '=ALL', 'AA', '2018', '1')
  const exports = await dataUtils.getData(2, '=ALL', 'AA', '2018', '2')
  const mappedImports = imports
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({
      class: a.keys[0].substring(13),
      value: a.vals[0],
      SITC1: parseInt(a.keys[0].substring(0, 1))
    }))
    .sort((a, b) => a.SITC1 - b.SITC1)
  console.log(mappedImports)
  const groupedImports = _.groupBy(mappedImports, 'SITC1')
  const finalImports = groupedImports
  // .map(a => {('children': a[0]}))
  const mappedExports = exports
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({
      class: a.keys[0].substring(13),
      value: a.vals[0],
      SITC1: parseInt(a.keys[0].substring(0, 1))
    }))
    .sort((a, b) => a.SITC1 - b.SITC1)
  //const finalImports = Object.assign({ flow: 'Imports' }, ...mappedImports)
  //const finalExports = Object.assign({ flow: 'Exports' }, ...mappedExports)

  const result = []
  result.push(finalImports, mappedExports)
  res.json(result)
})

tradeDataRouter.get('/SITC2/:country', async (req, res) => {
  const country = req.params.country
  const imports = await dataUtils.getData(2, '=ALL', country, '2018', '1')
  const sortedData = imports
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .sort((a, b) => b.vals - a.vals)
  res.json(sortedData)
})

module.exports = tradeDataRouter
