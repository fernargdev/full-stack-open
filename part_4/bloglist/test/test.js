const listHelper = require('../utils/list_helper')

// Unit test for dummy: returns one
describe('dummy example', () => {
  test('dummy returns 1', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
  })
})
