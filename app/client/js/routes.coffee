'use strict'

routes = angular.module 'parko.routes', ['ngRoute']

routes.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
  $routeProvider.when '/config', {
    templateUrl: '/template/config.html'
  }

  $locationProvider.html5Mode(false);
]
