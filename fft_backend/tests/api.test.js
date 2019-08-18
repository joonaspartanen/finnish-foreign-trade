const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Testing API:', () => {

  test('Trade data is returned as json', async () => {
    await api
      .get('/imports')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .get('/exports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Data is mapped correctly', async () => {
    const response = await api.get('/imports')
    expect(response.body[0]).toHaveProperty('id', 'year', 'euros')
  })

  test('Data is classified correctly', async () => {
    const response = await api.get('/imports')
    response.body.forEach(a => {
      expect(a).toHaveProperty('value')
      expect(a.value).toBeGreaterThanOrEqual(1)
      expect(a.value).toBeLessThanOrEqual(6)
    })
  })

})

