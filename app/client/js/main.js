(function() {
    angular.module( 'Parko', [ 'ngMaterial', 'md.data.table', 'ngMessages', 'parko.resources' ] )
        .controller("ConfigController", function($scope) {
            $scope.config = {
                availableControllers: 20
            };


        })
        .controller('UserController', function($scope, $mdDialog, $mdMedia, Users) {
            $scope.selected = [];
            $scope.user = {};
            $scope.query = {
                order: 'id',
                limit: 10,
                page: 1
            };

            $scope.getUsers = function() {
                $scope.promise = Users.query({
                    page: $scope.query.page,
                    limit: $scope.query.limit
                }, function(response) {
                    $scope.users = response.data;
                    $scope.query.count = response.count;
                })
                .$promise;
            }

            $scope.getUsers();

            $scope.openEditionWindow = function(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'template/userEditWindow.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:false,
                    fullscreen: useFullScreen
                })
                .then(function(user) {
                    $scope.getUsers();
                });
            };
        });
    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function(user) {
            $mdDialog.hide(user);
        };
    }
})();
