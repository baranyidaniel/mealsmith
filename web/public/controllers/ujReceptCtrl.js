app.controller('ujReceptCtrl', function($scope, database, $routeParams) {
    $scope.recept = {}

    $scope.felvetel = function() {
        console.log($scope.recept);
        if ($scope.recept.title == null || 
            $scope.recept.elkeszitesi_ido == null ||
            $scope.recept.short_desc == null ||
            $scope.recept.description == null) {
            alert('Tölts ki minden mezőt!!!!!!!!!')
            return
        }

        
    }
});