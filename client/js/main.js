angular.module( 'Pharking', [ 'ngMaterial', 'md.data.table' ] )
    .controller("ConfigController", function($scope) {
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
                }
            ]
        };
    });
