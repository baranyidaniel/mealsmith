app.controller('ujReceptCtrl', function($scope, fileUpload, database, $rootScope) {
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

        if ($scope.recept.img != null) {
            let uploadurl = 'http://localhost:5000/fileupload';

            fileUpload.uploadFile($scope.recept.img, uploadurl).then(function(res) {

                data.img = res.data.filename

                database.insert('posts', data).then(function(res) {
                    if (res.data.affectedRows != 0) {
                        $scope.recept = {}
                    } else {
                        alert('Váratlan hiba történt az adatbázis művelet során!');
                    }
                });
            });
        } 
        else 
        {
            database.insert('posts', data).then(function(res) {
                if (res.data.affectedRows > 0) {
                    alert('A recept sikeresen felvéve!')
                    $scope.recept = {}
                } 
                else alert('Hiba történt az adatbázis művelet során.')
            })
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
});
