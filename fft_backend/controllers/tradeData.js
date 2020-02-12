const tradeDataRouter = require('express').Router()
const dataUtils = require('../services/dataUtils')
var _ = require('lodash')

tradeDataRouter.get('/imports', async (req, res) => {
  const classifiedData = await dataUtils.getClassifiedTradeData(
    1,
    '0-9',
    '=ALL',
    '2018',
    '1'
  )
  res.json(classifiedData)
})

tradeDataRouter.get('/exports', async (req, res) => {
  const classifiedData = await dataUtils.getClassifiedTradeData(
    1,
    '0-9',
    '=ALL',
    '2018',
    '2'
  )
  res.json(classifiedData)
})

tradeDataRouter.get('/tradebalance', async (req, res) => {
  const imports = await dataUtils.getData(1, '0-9', 'AA', '=FIRST*;10', '1')
  const exports = await dataUtils.getData(1, '0-9', 'AA', '=FIRST*;10', '2')
  res.json(dataUtils.parseTradeBalance(imports, exports))
})

tradeDataRouter.get('/SITC1', async (req, res) => {
  // TODO: Extract business logic
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
  // TODO: Extract business logic
  const imports = await dataUtils.getData(2, '=ALL', 'AA', '2018', '1')
  const exports = await dataUtils.getData(2, '=ALL', 'AA', '2018', '2')
  console.log(imports)
  const mappedImports = imports
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({
      group: a.keys[0].substring(13),
      value: a.vals[0],
      SITC1: parseInt(a.keys[0].substring(0, 1))
    }))
    .sort((a, b) => a.SITC1 - b.SITC1)
  console.log(mappedImports)
  //const groupedImports = _.groupBy(mappedImports, 'SITC1')
  const result = [
    { group: 'Food and live animals', children: [] },
    { group: 'Beverages and tobacco', children: [] },
    { group: 'Crude materials, inedible, except fuels', children: [] },
    { group: 'Mineral fuels, lubricants and related materials', children: [] },
    { group: 'Animal and vegetable oils, fats and waxes', children: [] },
    { group: 'Chemicals and related products', children: [] },
    {
      group: 'Manufactured goods classified chiefly by material',
      children: []
    },
    { group: 'Machinery and transport equipment', children: [] },
    { group: 'Miscellaneous manufactured articles', children: [] },
    {
      group: 'Commodities and transactions not classified elsewhere',
      children: []
    }
  ]
  mappedImports.map(a => {
    result[a.SITC1].children.push(a)
  })
  console.log(result)
  // .map(a => {('children': a[0]}))
  const mappedExports = exports
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({
      group: a.keys[0].substring(13),
      value: a.vals[0],
      SITC1: parseInt(a.keys[0].substring(0, 1))
    }))
    .sort((a, b) => a.SITC1 - b.SITC1)
  //const finalImports = Object.assign({ flow: 'Imports' }, ...mappedImports)
  //const finalExports = Object.assign({ flow: 'Exports' }, ...mappedExports)

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
