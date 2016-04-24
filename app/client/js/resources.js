(function() {
    var resources = angular.module('parko.resources', ['ngResource']);

    resources
    .factory('Users', function($resource) {
        return $resource('/users/:id?page=:page&limit=:limit', {id: '@id', page: '@page', limit: '@limit'}, {
            query: {
                method: 'GET',
                url: '/users'
            }
        });
    })
})();
