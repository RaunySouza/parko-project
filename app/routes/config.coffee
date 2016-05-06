'use strict'

module.exports = (parko) ->
	router = parko.createRouter()

	ConfigController = parko.controllers.config
	configController = new ConfigController parko.models.config

	router.get '/', (req, res) ->
		configController.index req, res

	router.get '/:id', (req, res) ->
		configController.get req, res

	router.post '/', (req, res) ->
		configController.create req, res

	router.put '/:id', (req, res) ->
		configController.update req, res

	router.delete '/:id', (req, res) ->
		configController.delete req, res

	parko.registerRoute '/config_', router
	return router;
