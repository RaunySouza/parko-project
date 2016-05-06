'use strict'

module.exports = ->
	Controller = require './controller'

	class ConfigController extends Controller

		get: (req, res) ->
			self = @

			@model.findOne id: 1, (err, config) ->
				debugger
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse config
				return
			return

		update: (req, res) ->
			@model.update _id: 1, req.body, new: true, (err, config) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse {}
				return
			return

	ConfigController
