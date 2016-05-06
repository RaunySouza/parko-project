'use strict'

module.exports = (parko) ->
    router = parko.createRouter()
    authController = parko.controllers.authenticate

    router.get '/login', authController.login

    parko.registerRoute '/', router
    return router
