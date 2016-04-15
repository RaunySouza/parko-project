angular.module( 'Parko', [ 'ngMaterial', 'md.data.table' ] )
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
    });
