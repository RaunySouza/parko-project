'use strict'

angular.module 'parko-toolbar-controller', ['ngMaterial']
.controller 'ToolbarController', ['$mdDialog', ($mdDialog) ->
  @openMenu = ($mdOpenMenu, ev) ->
    $mdOpenMenu(ev);    
    return
  return
]
