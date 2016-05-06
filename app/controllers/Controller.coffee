'use strict'

module.exports = class Controller
    constructor: (model) ->
        @model = model;
  ###
    Create a basic response message

    var response = {
         result: 'OK', // || ERR
         resultData: { // For success (result = OK). Could be anything you want
             count: 0,
             data: [] // || {}
         },
         resultData: { // For Error (result = ERR). Always a code and a message ()
             code: 10,
             message: ''
         }
     };

  ###

  createSuccessResponse: (data) ->
    result: 'OK'
    resultData: data

  createErrorResponse: (errCode, errMessage) ->
    result: 'ERR'
    resultData:
      code: errCode
      message: errMessage
