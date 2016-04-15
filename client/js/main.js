angular.module( 'Parko', [ 'ngMaterial', 'md.data.table' ] )
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

        $scope.openEditionWindow = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: null,
                templateUrl: 'template/userEditWindow.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
            .then(function() {
                console.log('Saving User');
            }, function() {
                console.log('You cancelled the dialog.');
            });
        };
    });
