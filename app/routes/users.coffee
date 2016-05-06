'use strict'

module.exports = (parko) ->
    router = parko.createRouter()
    userController = parko.controllers.user

    router.get '/', userController.index
    router.get '/:id', userController.get
    router.post '/', userController.create
    router.put '/:id', userController.update
    router.delete '/:id', userController.delete
    router.patch '/block/:id', userController.block
    router.patch '/unblock/:id', userController.unblock

    parko.registerRoute '/users', router
    return router