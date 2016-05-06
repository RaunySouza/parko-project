'use strict'

Controller = require './controller'

class UserController extends Controller
    index: (req, res, next) ->
        response =
            count: 0
            data: []
        console.log(model)
        model.count (err, count) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
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
                        res.status(500).json(@createErrorResponse(err.name, err.message))
                    else
                        response.data = users
                        res.json @createSuccessResponse response
                    return
            return
        return

    get: (req, res, next) ->
        @model.findById req.params.id
        .exec (err, user) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
            else
                res.json @createSuccessResponse user
            return
        return

    create: (req, res, next) ->
        user = new User req.body
        user.save (err) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
            else
                res.json @createSuccessResponse user
            return
        return

    update: (req, res, next) ->
        @model.update _id: req.params.id, req.body, new: true, (err, user) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
            else
                res.json @createSuccessResponse {}
            return
        return

    delete: (req, res, next) ->
        @model.remove _id: req.params.id, (err) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
            else
                res.json @createSuccessResponse {}
            return
        return

    block: (req, res, next) ->
        @model.update {_id: req.params.id}, {$set: isBlocked: true}, (err, response) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
            else
                res.json @createSuccessResponse {}
            return
        return

    unblock: (req, res, next) ->
        @model.update {_id: req.params.id}, {$set: isBlocked: false}, (err, response) ->
            if err?
                res.status(500).json(@createErrorResponse(err.name, err.message))
            else
                res.json @createSuccessResponse {}
            return
        return

module.exports = (parko) ->
  new UserController parko.models.user
