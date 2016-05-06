'use strict'

module.exports = (parko) ->
	router = parko.createRouter()
	AuthController = parko.controllers.authenticate
	authController = new AuthController parko.models.user

	router.get '/login', (req, res) ->
		authController.login req, res

	parko.registerRoute '/', router
	return router
