app.controller('ujReceptCtrl', function($scope, database, $routeParams, $rootScope) {
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

        let data = {
            title: $scope.recept.title,
            user_id: $rootScope.loggedUser.id,
            description: $scope.recept.description,
            short_desc: $scope.recept.short_desc,
            ingredients: $scope.recept.ingredients,
            elkeszitesi_ido: $scope.recept.elkeszitesi_ido,
            adag: $scope.recept.adag
        }
        
        database.insert('posts', data).then(function(res) {
            if (res.data.affectedRows > 0) {
                alert('A recept sikeresen felvéve!')
                $scope.recept = {}
            } else alert('Hiba történt az adatbázis művelet során.')
        })
    }
});