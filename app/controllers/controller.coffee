'use strict'

module.exports = class Controller
    constructor: (model) ->
        @model = model;

    createSuccessResponse: (data) ->
        result: 'OK'
        resultData: data

    createErrorResponse: (errCode, errMessage) ->
        result: 'ERR'
        resultData:
            code: errCode
            message: errMessage
