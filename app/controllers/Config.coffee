'use strict'

Controller = require './controller'

class ConfigController extends Controller
  index: (req, res, next) ->
    response =
      count: 0
      data: []
    return "oi"

  get: (req, res, next) ->
    return

  create: (req, res, next) ->
    return

  update: (req, res, next) ->
    return

  delete: (req, res, next) ->
    return

module.exports = (parko) ->
  new ConfigController(parko.models.config)
