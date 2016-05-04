'use strict';

directives = angular.module 'parko.directives', []

directives.directive 'capitalize', () ->
    require: 'ngModel',
    link: (scope, element, attrs, modelCtrl) ->
      capitalize = (inputValue) ->
        inputed = inputValue
        inputed ?= ''

        capitalized = inputed.toUpperCase();
        if capitalized != inputed
          modelCtrl.$setViewValue(capitalized)
          modelCtrl.$render()

        capitalized

      modelCtrl.$parsers.push(capitalize)
      capitalize(scope[attrs.ngModel])
      return
