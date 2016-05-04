'use strict'

module.exports = (parko) ->
  router = parko.createRouter()
  configController = parko.controllers.Config

  router.get '/', configController.index
  router.get '/:id', configController.get
  router.post '/', configController.create
  router.put '/:id', configController.update
  router.delete '/:id', configController.delete

  parko.registerRoute '/config_', router
  return router;