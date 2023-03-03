app.controller("topLCtrl", function ($scope, database, $rootScope, $location) {
  $scope.user = {};
  $scope.fill = function () {
    let data = {
      table: "users",
      points: $scope.user.points,
    };
    database;
  };

  /*
    $scope.login = function() {
        if ($scope.user.email == null || $scope.user.pass1 == null) {
            alert('Nem adtál meg minden kötelező adatot!');
        } else {
            let data = {
                table: 'users',
                email: $scope.user.email,
                password: $scope.user.pass1
            }

            database.logincheck(data).then(function(res) {
                console.log(res.data);
                if (res.data.length == 0) {
                    alert('Hibás belépési adatok!');
                } else {
                    if (res.data[0].status == 0) {
                        alert('Tiltott felhasználó!');
                    } else {

                        res.data[0].last = moment(new Date()).format('YYYY-MM-DD H:m:s');
                        $rootScope.loggedUser = res.data[0];
                        let data = {
                            last: res.data[0].last
                        }
                        database.update('users', res.data[0].ID, data).then(function(res) {
                            sessionStorage.setItem('mealsmithApp', angular.toJson($rootScope.loggedUser));
                        });
                    }
                }
            });
        }
    }*/
});
