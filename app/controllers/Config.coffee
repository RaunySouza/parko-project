'use strict'

module.exports = ->
	Controller = require './controller'

	class ConfigController extends Controller
		index: (req, res) ->
			response =
				count: 0
				data: []
			return

		get: (req, res) ->
			return

		create: (req, res) ->
			return

		update: (req, res) ->
			return

		delete: (req, res) ->
			return

	ConfigController
