(function() {
    var resources = angular.module('parko.resources', ['ngResource']);

    resources
    .factory('Users', function($resource) {
        return $resource('/users/:id?page=:page&limit=:limit', {id: '@id', page: '@page', limit: '@limit'}, {
            query: {
                method: 'GET',
                url: '/users'
            },
            save: {
                method: 'POST',
                url: '/users'
            },
            update: {
                method: 'PUT',
                url: '/users/:id'
            },
            delete: {
                method: 'DELETE',
                url: '/users/:id'
            }
        });
    })
    .factory('Alert', function($mdToast) {
        return function(message) {
            var toast = $mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000);

            $mdToast.show(toast);
        };
    })
    .factory('Confirmation', function($mdDialog) {
        return function(event, message, successFunction, errorFunction) {
            var confirm = $mdDialog.confirm()
                .title('Alerta')
                .textContent(message)
                .targetEvent(event)
                .ok('Sim')
                .cancel('Não');
            $mdDialog.show(confirm).then(successFunction, errorFunction);
        }
    })
    .factory('Clone', function() {
        return function clone(obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
    });
})();
