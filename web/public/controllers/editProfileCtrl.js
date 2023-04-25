app.controller("editProfileCtrl", function ($scope, $routeParams, database, $rootScope, $location, $route) {
    
    $scope.user = {}
    $scope.userEdit = {}

    $scope.getUserData = function() {
        database.selectByValue('users', 'id', $routeParams.id).then(function(res) {
            $scope.user = res.data[0]
            $scope.userEdit.display_name = $scope.user.display_name
            $scope.userEdit.email = $scope.user.email
        })
    }

    $scope.backToProfile = function() {
        $location.path('/profiles/' + $routeParams.id)
    }

    $scope.modDisplayName = function() {
        if ($scope.userEdit.display_name == null || $scope.userEdit.display_name.trim() == "") {
            alert('A megjelenítési név nem lehet üres!')
            return
        }

        let data = {
            display_name: $scope.userEdit.display_name
        }

        database.update('users', $routeParams.id, data).then(function(res) {
            if (res.data.affectedRows != 0) {
                $scope.getUserData()
                alert('Sikeres módosítás!')
            } else {
                alert('Hiba történt az adatbázis művelet során!')
            }
        })
    }

    $scope.modEmail = function() {
        if ($scope.userEdit.email == null || $scope.userEdit.email.trim() == "") {
            alert('Az e-mail nem lehet üres!')
            return
        }

        let emailRegex = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
        if (!$scope.userEdit.email.match(emailRegex)) {
            alert('Írj be egy e-mail címet!')
            return
        }

        if ($scope.userEdit.email == $scope.user.email) {
            alert('Az új e-mail cím megegyezik a régi e-mail címeddel!')
            return
        }

        database.selectByValue('users', 'email', $scope.userEdit.email).then(function(res) {
            if (res.data.length == 0) {
                let data = {
                    email: $scope.userEdit.email
                }
        
                database.update('users', $routeParams.id, data).then(function(res) {
                    if (res.data.affectedRows != 0) {
                        $scope.getUserData()
                        alert('Sikeres módosítás!')
                    } else {
                        alert('Hiba történt az adatbázis művelet során!')
                    }
                })
            } else {
                alert('Ez az e-mail cím már foglalt!')
            }
        })
    }

    $scope.modPassword = function() {
        if ($scope.userEdit.oldpw == null || $scope.userEdit.oldpw.trim() == "" ||
            $scope.userEdit.newpw1 == null || $scope.userEdit.newpw1.trim() == "" ||
            $scope.userEdit.newpw2 == null || $scope.userEdit.newpw2.trim() == "") {
            alert('Adj meg egy jelszót!')
            return
        }

        var pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
        if (!$scope.user.newpw1.match(pwdRegex)) {
            alert("A megadott jelszó nem felel meg a minimális biztonsági követelményeknek!");
            return;
        }

        let data = {
            passwd: CryptoJS.SHA1($scope.userEdit.newpw1).toString()
        }

        database.update('users', $routeParams.id, data).then(function(res) {
            if (res.data.affectedRows != 0) {
                $scope.getUserData()
                alert('Sikeres módosítás!')
            } else {
                alert('Hiba történt az adatbázis művelet során!')
            }
        })
    }

    $scope.getUserData()
});