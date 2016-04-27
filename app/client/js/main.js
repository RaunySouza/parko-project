(function() {
    angular.module( 'Parko', [ 'ngMaterial', 'md.data.table', 'ngMessages', 'ngMask', 'parko.resources', 'parko.directives', 'parko.routes' ] )
        .controller("ConfigController", function($scope) {
            $scope.config = {
                availableControllers: 20
            };


        })
        .controller('UserController', function($scope, $mdDialog, $mdMedia, Users, Alert, Confirmation) {
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
                    if (response.result === 'OK') {
                        $scope.users = response.resultData.data;
                        $scope.query.count = response.resultData.count;
                    } else {
                        Alert(response.resultData.message);
                    }
                })
                .$promise;
            }

            $scope.getUsers();

            $scope.openEditionWindow = function(ev, selected) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                $mdDialog.show({
                    controller: EditionController,
                    templateUrl: 'template/userEditWindow.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:false,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: selected
                    }
                })
                .then(function(user) {
                    $scope.getUsers();
                });
            };

            $scope.delete = function(ev, selected) {
                Confirmation(ev, 'Deseja remover definitivamente o usuário?', function() {
                    Alert('Usuário removido com sucesso!');
                    Users.delete({id: selected._id});
                    $scope.getUsers();
                });
            }

            $scope.blockUser = function(ev, selected) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                $mdDialog.show({
                   controller: BlockerController,
                    templateUrl: 'template/blockUserWindow.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: selected
                    }
                })
                .then(function(user) {

                });
            }
        });
    function BlockerController($scope, $mdDialog, Users, Alert, Clone, selected) {
        $scope.user = Clone(selected);

        $scope.cancel = function () {
            $mdDialog.cancel();
        }

        $scope.block = function (user) {
            $mdDialog.hide(user);
        }
    }

    function EditionController($scope, $mdDialog, Users, Alert, Clone, selected) {
        $scope.user = Clone(selected);
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function(user) {
            $scope.saving = true;
            if ($scope.user._id) {
                Users.update({id: $scope.user._id}, user, function(response) {
                    if (response.result === 'OK') {
                        Alert('Usuário alterado com sucesso!');
                        $mdDialog.hide(user);
                    }
                },
                function(err) {
                    Alert(err.data.resultData.message);
                    $scope.saving = false;
                })
            } else {
                Users.save(user, function(response) {
                    if (response.result === 'OK') {
                        Alert('Usuário criado com sucesso!');
                        $mdDialog.hide(user);
                    }
                },
                function(err) {
                    Alert(err.data.resultData.message);
                    $scope.saving = false;
                });
            }
        };
    }
})();
