'use strict';

resources = angular.module 'parko.resources', ['ngResource']

resources.factory 'Users', ['$resource', ($resource) ->
  $resource '/users/:id?page=:page&limit=:limit',
  {
    id: '@id'
    page: '@page'
    limit: '@limit'
  },
  {
    query:
      method: 'GET'
      url: '/users'
    save:
      method: 'POST'
      url: '/users'
    update:
      method: 'PUT'
      url: '/users/:id'
    delete:
      method: 'DELETE'
      url: '/users/:id'
  }
]

resources.factory 'Alert', ['$mdToast', ($mdToast) ->
  (message) ->
    toast = $mdToast.simple().textContent(message).position('top right').hideDelay(3000);
    $mdToast.show toast
    return
]

resources.factory 'Confirmation', ['$mdDialog', ($mdDialog) ->
  (event, message, successFunction, errorFunction) ->
    confirm = $mdDialog.confirm()
      .title('Alerta')
      .textContent(message)
      .targetEvent(event)
      .ok('Sim')
      .cancel('Não')

    $mdDialog.show(confirm).then(successFunction, errorFunction)
    return
]

resources.factory 'Clone', () ->
  clone = (obj) ->
    if obj == null or typeof obj != 'object'
      return obj

    if obj instanceof Date
      copy = new Date
      copy.setTime(obj.getTime())
      return copy

    if obj instanceof Array
      copy = []
      copy.push clone attr for attr in obj
      return copy

    if obj instanceof Object
      copy = {}
      for own key, value of obj
        copy[key] = clone value
      return copy

    throw new Error 'Unable to copy obj! Its type isn\'t supported.'