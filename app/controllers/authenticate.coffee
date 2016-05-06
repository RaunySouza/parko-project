'use strict'

module.exports = ->
	Controller = require './controller'

	class AuthController extends Controller
		login: (req, res) ->
			@model.findOne {}
			return

	AuthController
