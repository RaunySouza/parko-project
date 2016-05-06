'use strict';

angular.module 'parko.controllers'
.controller 'ConfigController', ['$scope', 'Config', ($scope, Config) ->
	Config.query {}, (response) ->
		if response.result is 'OK'
			$scope.config = response.resultData
		else
			Alert response.resultData.message
	return
]
