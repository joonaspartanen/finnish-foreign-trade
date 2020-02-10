const supertest = require('supertest')
const app = require('../app')
const { checkProperties } = require('./testHelper')
const api = supertest(app)

describe('imports', () => {
  let response

  beforeAll(async () => {
    response = await api.get('/imports')
  })

  test('are returned as json', async () => {
    await api
      .get('/imports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('have correct properties', () => {
    checkProperties(response, ['id', 'year', 'euros'])
  })

  test('are classified correctly', () => {
    response.body.forEach(a => {
      expect(a).toHaveProperty('value')
      expect(a.value).toBeGreaterThanOrEqual(1)
      expect(a.value).toBeLessThanOrEqual(6)
    })
  })
})

describe('exports', () => {
  let response

  beforeAll(async () => {
    response = await api.get('/exports')
  })

  test('are returned as json', async () => {
    await api
      .get('/exports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('have correct properties', () => {
    checkProperties(response, ['id', 'year', 'euros'])
  })

  test('are classified correctly', () => {
    response.body.forEach(a => {
      expect(a).toHaveProperty('value')
      expect(a.value).toBeGreaterThanOrEqual(1)
      expect(a.value).toBeLessThanOrEqual(6)
    })
  })
})

describe('trade balance', () => {
  test('is returned as json', async () => {
    await api
      .get('/tradebalance')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('has correct properties', async () => {
    const response = await api.get('/tradebalance')
    checkProperties(response, ['year', 'imports', 'exports', 'tradeBalance'])
  })
})

describe('SITC1 data', () => {
  let response

  beforeAll(async () => {
    response = await api.get('/SITC1')
  })

  test('is returned as json', async () => {
    await api
      .get('/SITC1')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('has correct properties', () => {
    checkProperties(response, ['flow'])
  })

  test('contains right number of product groups', () => {
    expect(Object.keys(response.body[0]).length).toBe(11)
    expect(Object.keys(response.body[1]).length).toBe(11)
  })
})
