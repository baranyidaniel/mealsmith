app.controller('ujReceptCtrl', function($scope, database, $routeParams, $rootScope) {
    $scope.recept = {}
    $scope.recept.hozzavalok = []

    $scope.felvetel = function() {
        if ($scope.recept.title == null || 
            $scope.recept.elkeszitesi_ido == null ||
            $scope.recept.description == null ||
            $scope.recept.hozzavalok.length == 0) {
            alert('Tölts ki minden mezőt!!!!!!!!!')
            return
        }

        let data = {
            title: $scope.recept.title,
            user_id: $rootScope.loggedUser.id,
            description: $scope.recept.description,
            short_desc: $scope.recept.short_desc,
            ingredients: $scope.getIngredients(),
            elkeszitesi_ido: $scope.recept.elkeszitesi_ido,
            adag: $scope.recept.adag
        }
        
        database.insert('posts', data).then(function(res) {
            if (res.data.affectedRows > 0) {
                alert('A recept sikeresen felvéve!')
                $scope.recept = {}
            } else alert('Hiba történt az adatbázis művelet során.')
        })

        document.getElementById('hozzavalok').innerHTML = '';
    }

    $scope.addIngredient = function() {
        if ($scope.recept.hozzavalo == null || $scope.recept.mennyiseg == null) {
            alert("Adj meg nevet és mennyiséget a hozzávalónak")
            return;
        }

        $scope.recept.hozzavalok.push({
            "hozzavalo": $scope.recept.hozzavalo,
            "mennyiseg": $scope.recept.mennyiseg
        })

        $scope.recept.hozzavalo = ''
        $scope.recept.mennyiseg = ''

        $scope.showIngredients()
    }

    $scope.showIngredients = function() {
        let div = document.getElementById('hozzavalok')
        div.innerHTML = ''
        let hozzavalokLista = document.createElement('ul')
        for (let i = 0; i < $scope.recept.hozzavalok.length; i++) {
            let hozzavaloElem = document.createElement('li')

            hozzavaloElem.innerText = `${$scope.recept.hozzavalok[i].hozzavalo} - ${$scope.recept.hozzavalok[i].mennyiseg}`

            hozzavalokLista.appendChild(hozzavaloElem)
        }
        
        div.appendChild(hozzavalokLista)
    }

    $scope.getIngredients = function() {
        let string = ""
        $scope.recept.hozzavalok.forEach(item => {
            string += `${item.hozzavalo};${item.mennyiseg}|`
        });

        return string;
    }
});
