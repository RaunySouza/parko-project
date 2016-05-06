'use strict';

angular.module 'parko.controllers'
.controller 'ConfigController', ['$scope', 'Config', 'Alert', ($scope, Config, Alert) ->
	Config.query {}, (response) ->
		if response.result is 'OK'
			$scope.config = response.resultData
		else
			Alert response.resultData.message

	$scope.save = (form) ->
		$scope.saving = true
		Config.update {}, $scope.config, (response) ->
			Alert "Alterações Salvas com Sucesso" if response.result is 'OK'
			$scope.saving = false
			return
		, (err) ->
			Alert err.data.resultData.message
			$scope.saving = false

	return
]
