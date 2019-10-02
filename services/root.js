'use strict'

var User = require('../models/user')

module.exports = function (fastify, opts, next) {
  fastify.get('/api/users', function (request, reply) {
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

  fastify.get('/api/user/:userId', function (request, reply) {
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
    Room.findByPk(request.query.userId).then(function (user) {
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
