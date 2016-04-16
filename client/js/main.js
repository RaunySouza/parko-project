angular.module( 'Parko', [ 'ngMaterial', 'md.data.table', 'ngMessages' ] )
    .controller("ConfigController", function($scope, $mdDialog, $mdMedia) {
        $scope.config = {
            availableControllers: 20,
            users: [
                {
                    id: 1,
                    name: "Rauny Souza",
                    email: "rauny.souza@gmail.com",
                    vehicle: {
                        vendor: "Ford",
                        model: "Fiesta",
                        color: "Branca"
                    }
                },
                {
                    id: 2,
                    name: "Manoel Amaro",
                    email: "manoel.amaro@gmail.com",
                    vehicle: {
                        vendor: "Renault",
                        model: "Sandero",
                        color: "Azul"
                    }
                }
            ]
        };

        $scope.selected = [];
        $scope.query = {
            order: 'id',
            limit: 1,
            rowsPerPage: 10,
            page: 1
        };

        $scope.user = {};

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
                //XXX MOCK
                user.id = $scope.config.users.length + 1;
                $scope.config.users.push(user);
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
