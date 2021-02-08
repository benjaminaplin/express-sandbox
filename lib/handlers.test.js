const handlers = require('./handlers.ts')

test('home page renders', () => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.home(req, res)
  expect(res.render.mock.calls[0][0]).toBe('home')
})

test('about page renders', () => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.about(req, res)
  expect(res.render.mock.calls[0][0]).toBe('about')
})

test('about page renders a fortune', () => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.about(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('about')
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    }),
  )
})

it('404 handler renders', () => {
  const req = {}
  const res = {
    type: jest.fn(), status: jest.fn(), send: jest.fn(), render: jest.fn(),
  }
  handlers.notFound(req, res)
  // expect(res.render.mock.calls.length).toBe(1)
  // expect(res.render.mock.calls[0][0]).toBe('404 - Not Found')
})

test('500 handler renders', () => {
  const err = new Error('some error')
  const req = {}
  const res = { render: jest.fn() }
  const next = jest.fn()
  handlers.serverError(err, req, res, next)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('500')
})
