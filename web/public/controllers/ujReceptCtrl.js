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

        let data = {
            title: $scope.recept.title,
            description: $scope.recept.description,
            short_desc: $scope.recept.short_desc,
            elkeszitesi_ido: $scope.recept.elkeszitesi_ido,
            adag: $scope.recept.adag
        }
        
        database.insert('posts', data).then(function(res) {
            if (res.data.affectedRows > 0) {
                alert('A recept sikeresen felvéve!')
            } else alert('Hiba történt az adatbázis művelet során.')
        })
    }
});