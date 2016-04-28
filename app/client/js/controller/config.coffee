'use strict';

angular.module 'parko.controllers'
.controller 'ConfigController', ['$scope', ($scope) ->
    $scope.config =
        availableControllers: 30
]
