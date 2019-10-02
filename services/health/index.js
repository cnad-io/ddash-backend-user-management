'use strict'

module.exports = function (fastify, opts, next) {
  fastify.get('/health', {
    schema: {
      description: 'Get health status',
      summary: 'Returns if the API is ok or not',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, function (request, reply) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        message: 'ok'
      })
  })

  next()
}
