'use strict'

var User = require('../models/user')

module.exports = function (fastify, opts, next) {
  fastify.get('/api', {
    schema: {
      description: 'Get info of API',
      summary: 'Returns all possible paths for this API',
      response: {
        200: {
          description: 'Successful response',
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  }, function (request, reply) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send([
        '/api/users',
        '/api/user',
        '/api/user/:userId',
        '/api/user/username/:username'
      ])
  })

  fastify.get('/api/users', {
    schema: {
      description: 'Get all users registered',
      summary: 'Returns a list of users',
      response: {
        200: {
          description: 'Successful response',
          type: 'array',
          items: {
            properties: {
              id: { type: 'string' },
              username: { type: 'string' }
            }
          }
        }
      }
    }
  }, function (request, reply) {
    User.findAll().then(function (users) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(users)
    }).catch(function (error) {
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(error)
    })
  })

  fastify.get('/api/user/:userId', {
    schema: {
      description: 'Get an user registered by ID',
      summary: 'qwerty',
      params: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID'
          }
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' }
          }
        }
      }
    }
  }, function (request, reply) {
    User.findByPk(request.query.userId).then(function (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(user)
    }).catch(function (error) {
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(error)
    })
  })

  fastify.get('/api/user/username/:username', {
    schema: {
      description: 'Get an user registered by username',
      summary: 'qwerty',
      params: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'Username'
          }
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' }
          }
        }
      }
    }
  }, function (request, reply) {
    User.find({
      where: {
        username: request.query.userId
      }
    }).then(function (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(user)
    }).catch(function (error) {
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(error)
    })
  })

  fastify.post('/api/user', function (request, reply) {
    User.create(request.body).then(function (user) {
      reply
        .code(201)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(user)
    }).catch(function (error) {
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(error)
    })
  })

  fastify.put('/api/user/:userId', function (request, reply) {
    User.findByPk(request.query.userId).then(function (user) {
      User.update(user, {
        where: {
          id: request.query.userId
        }
      }).then(function (updated) {
        reply
          .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(updated)
      })
    }).catch(function (error) {
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(error)
    })
  })

  fastify.delete('/api/user/:roomId', function (request, reply) {
    User.destroy({
      where: {
        id: request.query.userId
      }
    }).then(function () {
      reply
        .code(204)
    }).catch(function (error) {
      reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(error)
    })
  })

  next()
}
