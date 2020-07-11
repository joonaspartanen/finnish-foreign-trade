const supertest = require('supertest')
const app = require('../app')
const { checkProperties } = require('./testHelper')
const api = supertest(app)

// Tests skipped until external API calls have been mocked

describe.skip('imports', () => {
  let response

  beforeAll(async done => {
    response = await api.get('/imports')
    done()
  })

  test('are returned as json', async done => {
    await api
      .get('/imports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    done()
  })

  test('have correct properties', () => {
    checkProperties(response.body[0], ['id', 'year', 'euros'])
  })

  test('are classified correctly', () => {
    response.body.forEach(a => {
      expect(a).toHaveProperty('value')
      expect(a.value).toBeGreaterThanOrEqual(1)
      expect(a.value).toBeLessThanOrEqual(6)
    })
  })
})

describe.skip('exports', () => {
  let response

  beforeAll(async done => {
    response = await api.get('/exports')
    done()
  })

  test('are returned as json', async done => {
    await api
      .get('/exports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    done()
  })

  test('have correct properties', () => {
    checkProperties(response.body[0], ['id', 'year', 'euros'])
  })

  test('are classified correctly', () => {
    response.body.forEach(a => {
      expect(a).toHaveProperty('value')
      expect(a.value).toBeGreaterThanOrEqual(1)
      expect(a.value).toBeLessThanOrEqual(6)
    })
  })
})

describe.skip('trade balance', () => {
  test('is returned as json', async done => {
    await api
      .get('/tradebalance')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    done()
  })

  test('has correct properties', async () => {
    const response = await api.get('/tradebalance')
    checkProperties(response.body[0], ['year', 'imports', 'exports', 'tradeBalance'])
  })
})

describe.skip('SITC1 data', () => {
  let response

  beforeAll(async done => {
    response = await api.get('/SITC1')
    done()
  })

  test('is returned as json', async done => {
    await api
      .get('/SITC1')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    done()
  })

  test('has correct properties', () => {
    checkProperties(response.body[0], ['flow'])
  })

  test('contains right number of product groups', () => {
    expect(Object.keys(response.body[0]).length).toBe(11)
    expect(Object.keys(response.body[1]).length).toBe(11)
  })
})
