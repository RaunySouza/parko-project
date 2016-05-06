'use strict'

module.exports = (parko) ->
	router = parko.createRouter()

	ConfigController = parko.controllers.config
	configController = new ConfigController parko.models.config

	router.get '/', (req, res) ->
		configController.get req, res

	router.put '/:id', (req, res) ->
		configController.update req, res

	parko.registerRoute '/config_', router
	return router;
