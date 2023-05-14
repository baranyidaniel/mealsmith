app.controller('editReceptCtrl', function($scope, fileUpload, database, $rootScope, $routeParams, $location) {
    $scope.recept = {}
    $scope.recept.hozzavalok = []

    $scope.displayIngredients = function() {
        $scope.recept.hozzavalok = []

        $scope.recept.ingredients.split('|').forEach(line => {
            $scope.recept.hozzavalok.push({
                "id": $scope.recept.hozzavalok.length + 1,
                "hozzavalo": line.split(';')[0],
                "mennyiseg": line.split(';')[1]
            })
        });
    }

    $scope.getDetails = function() {
        database.selectByValue('posts', 'id', $routeParams.id).then(function(res) {
            $scope.recept = res.data[0]

            $scope.displayIngredients()
        })
    }

    $scope.apply = function() {
        if ($scope.recept.title == null || 
            $scope.recept.elkeszitesi_ido == null ||
            $scope.recept.description == null) {
            alert('Tölts ki minden *-al jelzett mezőt!')
            return
        }

        if ($scope.recept.title == "" || $scope.recept.title.trim() == "") {
            alert('Adj meg egy címet a receptnek')
            return
        }

        if ($scope.recept.description == "" || $scope.recept.description.trim() == "") {
            alert('Add meg a leírást!')
            return
        }
        
        if ($scope.recept.hozzavalok.length == 0) {
            alert('Adj meg legalább egy hozzávalót!')
            return
        }

        let data = {
            title: $scope.recept.title,
            description: $scope.recept.description,
            short_desc: $scope.recept.short_desc,
            ingredients: $scope.getIngredients(),
            elkeszitesi_ido: $scope.recept.elkeszitesi_ido,
            adag: $scope.recept.adag
        }

        database.update('posts', $routeParams.id, data).then(function(res) {
            if (res.data.affectedRows > 0) {
                if ($scope.recept.img != null) {
                    let uploadurl = 'http://localhost:5000/fileupload';

                    fileUpload.uploadFile($scope.recept.img, uploadurl).then(function(res) {
                        database.update('posts', $routeParams.id, { img: res.data.filename }).then(function(res) {
                            if (res.data.affectedRows != 0) {
                                $location.path('/receptek/' + $routeParams.id)
                            } else {
                                alert('Váratlan hiba történt az adatbázis művelet során!');
                            }
                        });
                    });
                } else {
                    $location.path('/receptek/' + $routeParams.id)
                }
            } 
            else alert('Hiba történt az adatbázis művelet során.')
        })
    }

    $scope.cancel = function() {
        if (confirm('Ha visszalépsz, az összes módosított adat elvész!')) {
            $location.path('/receptek/' + $routeParams.id)
        }
    }

    $scope.addIngredient = function() {
        if ($scope.recept.hozzavalo == null || $scope.recept.hozzavalo == "") {
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

    }

    $scope.getIngredients = function() {
        let string = ""

        for (let i = 0; i < $scope.recept.hozzavalok.length; i++) {
            const item = $scope.recept.hozzavalok[i];
            string += `${item.hozzavalo};${item.mennyiseg}${i == $scope.recept.hozzavalok.length - 1 ? '' : '|'}`
        }

        return string;
    }

    $scope.removeIngredient = function(id) {
        let element = document.getElementById('li_' + id)

        let idx = $scope.recept.hozzavalok.findIndex(x => x.id == id)
        $scope.recept.hozzavalok.splice(idx, 1)

        document.getElementById('hozzavalokLista').removeChild(element)
    }

    $scope.getDetails()
});
