'use strict'

Controller = require './controller'

module.exports = (parko) ->
  class ConfigController extends Controller
    index: (req, res, next) ->
      response =
        count: 0
        data: []
      return

    get: (req, res, next) ->
      return

    create: (req, res, next) ->
      return

    update: (req, res, next) ->
      return

    delete: (req, res, next) ->
      return

  new ConfigController parko.models.config
