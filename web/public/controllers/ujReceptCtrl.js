app.controller('ujReceptCtrl', function($scope, database, $rootScope) {
    $scope.recept = {}
    $scope.recept.hozzavalok = []

    $scope.felvetel = function() {
        if ($scope.recept.title == null || 
            $scope.recept.elkeszitesi_ido == null ||
            $scope.recept.description == null ||
            $scope.recept.hozzavalok.length == 0) {
            alert('Tölts ki minden *-al jelzett mezőt!')
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
            } 
            else alert('Hiba történt az adatbázis művelet során.')
        })

        document.getElementById('hozzavalok').innerHTML = '';
    }

    $scope.removeIngredient = function(id) {
        $scope.recept.hozzavalok.splice(id, 1)
        $scope.showIngredients()
    }

    $scope.addIngredient = function() {
        if ($scope.recept.hozzavalo == null) {
            alert("Adj meg nevet a hozzávalónak")
            return;
        }

        $scope.recept.hozzavalok.push({
            "id": $scope.recept.hozzavalok.length + 1,
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
        hozzavalokLista.classList.add("hozzavalok")
        for (let i = 0; i < $scope.recept.hozzavalok.length; i++) {

            hozzavalokLista.innerHTML += `<li id="${$scope.recept.hozzavalok[i].id}">${$scope.recept.hozzavalok[i].hozzavalo} ${$scope.recept.hozzavalok[i].mennyiseg != "" ? " -" + $scope.recept.hozzavalok[i].mennyiseg : ""}<i class="bi bi-trash-fill" ng-click="removeIngredient(${$scope.recept.hozzavalok[i].id})"></i></li>`

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
