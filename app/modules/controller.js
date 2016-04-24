/**
 * Utilities functions to use in controllers, like create a controller with basic functions and etc.
 */
'use strict';

module.exports = {
    createController: function() {
        return {
            /**
             * Create a basic response message
             *
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
             *
             */
            createSuccessResponse: function(data) {
                return {
                    result: 'OK',
                    resultData: data
                };
            },
            createErrorResponse: function(errCode, errMessage) {
                return {
                    result: 'ERR',
                    resultData: {
                        code: errCode,
                        message: errMessage
                    }
                };
            }
        };
    }
}
