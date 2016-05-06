'use strict'

Controller = require './controller'

module.exports = (parko) ->
    class AuthController extends Controller
        login: (req, res, next) ->
            @model.findOne {}
            return

    new AuthController parko.models.user
