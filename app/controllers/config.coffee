'use strict'

module.exports = ->
	Controller = require './controller'

	class ConfigController extends Controller

		get: (req, res) ->
			@model.findOne id: 1, (err, config) =>
				debugger
				if err?
					res.status(500).json(@createErrorResponse(err.name, err.message))
				else
					res.json @createSuccessResponse config
				return
			return

		update: (req, res) ->
			@model.update id: 1, req.body, new: true, (err, config) =>
				if err?
					res.status(500).json(@createErrorResponse(err.name, err.message))
				else
					res.json @createSuccessResponse {}
				return
			return

	ConfigController
