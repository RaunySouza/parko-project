'use strict'

module.exports = ->
	Controller = require './controller'

	class UserController extends Controller
		index: (req, res) ->
			response =
				count: 0
				data: []

			self = @

			@model.count (err, count) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					response.count = count

					# Check if it has pagination?
					limit = Math.min count, req.query.limit
					page = Math.max 0, req.query.page - 1

					@model.find()
					.limit limit
					.skip limit * page
					.sort id: 'desc'
					.exec (err, users) ->
						if err?
							res.status(500).json(self.createErrorResponse(err.name, err.message))
						else
							response.data = users
							res.json self.createSuccessResponse response
						return
				return
			return

		get: (req, res) ->
			self = @

			@model.findById req.params.id
			.exec (err, user) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse user
				return
			return

		create: (req, res) ->
			self = @

			user = new User req.body
			user.save (err) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse user
				return
			return

		update: (req, res) ->
			self = @

			@model.update _id: req.params.id, req.body, new: true, (err, user) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse {}
				return
			return

		delete: (req, res) ->
			self = @

			@model.remove _id: req.params.id, (err) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse {}
				return
			return

		block: (req, res) ->
			self = @

			@model.update {_id: req.params.id}, {$set: isBlocked: true}, (err, response) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse {}
				return
			return

		unblock: (req, res) ->
			self = @

			@model.update {_id: req.params.id}, {$set: isBlocked: false}, (err, response) ->
				if err?
					res.status(500).json(self.createErrorResponse(err.name, err.message))
				else
					res.json self.createSuccessResponse {}
				return
			return
	UserController

