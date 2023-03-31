app.controller('profilCtrl', function($scope, database, $rootScope, $location, $routeParams, $filter) {

    $scope.user = {}
    $scope.userRecipes = {}
    $scope.kovetettUserek = {}
    app.controller("userCtrl", function ($scope, database, $rootScope, $location, $route) {
      $scope.user = {};
    
      $scope.registration = function () {
        if ($scope.user.username == null ||
          $scope.user.email == null ||
          $scope.user.pass1 == null ||
          $scope.user.pass2 == null)
          {
            alert("Nem adtál meg minden kötelező adatot!");
            return
          }
    
        if ($scope.user.pass1 != $scope.user.pass2) {
          alert("A megadott jelszavak nem egyeznek!");
          return
        } 
    
        var pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
        if (!$scope.user.pass1.match(pwd_pattern)) {
          alert("A megadott jelszó nem felel meg a minimális biztonsági követelményeknek!");
          return;
        }
      
        let data = {
          username: $scope.user.username,
          email: $scope.user.email,
          passwd: CryptoJS.SHA1($scope.user.pass1).toString(),
        };
    
        database.insert("users", data).then(function (res) {
          if (res.data.affectedRows != 0) {
            alert("A regisztráció sikeres! Beléphetsz az oldalra!");
            $scope.user = {};
            $location.path("/");
          } else {
            alert("Váratlan hiba történt az adatbázis művelet során!");
          }
        });
      };
    
      $scope.login = function () {
        if ($scope.user.email == null || $scope.user.pass1 == null) {
          alert("Nem adtál meg minden kötelező adatot!");
          return
        }
        
        let data = {
          table: "users",
          email: $scope.user.email,
          passwd: CryptoJS.SHA1($scope.user.pass1).toString()
        };
    
        database.logincheck(data).then(function (res) {
          if (res.data.length == 0) {
            alert("Hibás belépési adatok!");
            return
          }
    
          if (res.data[0].status == 2) {
            alert("Tiltott felhasználó!");
            return
          }
          res.data[0].last = moment(new Date()).format("YYYY-MM-DD H:m:s");
          $rootScope.loggedUser = res.data[0];
          let data = {
            last: res.data[0].last
          }
          database.update('users', $rootScope.loggedUser.id, data).then(function(res) {
            sessionStorage.setItem('mealsmithApp', angular.toJson($rootScope.loggedUser));
          });
    
          $location.path("/");
          $route.reload()
        });
      };
    
      $scope.logout = function () {
        $rootScope.loggedUser = null;
        sessionStorage.removeItem("mealsmithApp");
        $location.path("/");
        $route.reload()
      };
    });
    if ($routeParams.id != null){
        database.selectByValue('posts', 'user_id', $routeParams.id)
        .then(function(res) {
            $scope.userRecipes = res.data
            $scope.userRecipes = $filter('orderBy')($scope.userRecipes, '-points')
        })

        database.selectByValue('users', 'id', $routeParams.id)
        .then(function(res){
            $scope.user = res.data[0]
        })
    }

    $scope.userRegTime = function(){
        return moment($rootScope.loggedUser.reg).format('YYYY-MM-DD')
    }

    $scope.userLastLoginTime = function(){
        return moment($rootScope.loggedUser.last).format('YYYY-MM-DD')
    }

    $scope.showRecept = function(id) {
        $location.path('/receptek/' + id)
    }

    $scope.addToFollow = function (id){
        database.selectAll('follows')
          .then(function(res){
            res.data.forEach(item => {
              if (item.user_id == $rootScope.loggedUser.id && item.kovetett_user_id == id) {
                  database.delete('follows', 'kovetett_user_id', id).then(function() {
                    return
                  })
              }
          });
    
          let data = {
            user_id: $rootScope.loggedUser.id,
            kovetett_user_id: id
          }
    
          database.insert('follows', data).then(function() {
            return
          })
      }
    )
    }
})