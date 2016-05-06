'use strict'

module.exports = (parko) ->
    router = parko.createRouter()
    UserController = parko.controllers.user
    userController = new UserController parko.models.user

    router.get '/', (req, res) ->
        userController.index req, res

    router.get '/:id', (req, res) ->
        userController.get req, res

    router.post '/', (req, res) ->
        userController.create req, res

    router.put '/:id', (req, res) ->
        userController.update req, res

    router.delete '/:id', (req, res) ->
        userController.delete req, res

    router.patch '/block/:id', (req, res) ->
        userController.block req, res

    router.patch '/unblock/:id', (req, res) ->
        userController.unblock req, res

    parko.registerRoute '/users', router
    return router
