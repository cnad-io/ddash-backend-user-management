'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('Health function', (t) => {
  t.plan(2)
  const app = build(t)

  app.inject({
    url: '/health'
  }, (err, res) => {
    t.error(err)
    t.deepEqual(JSON.parse(res.payload), { message: 'ok' })
  })
})
