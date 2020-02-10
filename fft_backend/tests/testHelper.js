const checkProperties = (response, properties) => {
  properties.forEach(p => {
    expect(response.body[0]).toHaveProperty(p)
  })
}

module.exports = { checkProperties: checkProperties }
