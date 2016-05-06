'use strict'

angular.module 'parko-toolbar-controller', ['ngMaterial']
.controller 'ToolbarController', ['$mdDialog', '$location', ($mdDialog, $location) ->
  @openMenu = ($mdOpenMenu, ev) ->
    $mdOpenMenu(ev);
    return
  @openConfig = () ->
    $location.path('/config')
  return
]
