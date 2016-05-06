'use strict'

angular.module 'parko.routes', ['ngRoute']
.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
  $routeProvider.when '/config', {
    templateUrl: '/template/config.html'
  }

  $locationProvider.html5Mode(false);
]
