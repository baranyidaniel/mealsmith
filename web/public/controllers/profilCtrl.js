app.controller('profilCtrl', function($scope, database, $rootScope, $location, $routeParams, $filter) {

    $scope.user = {}
    $scope.userRecipes = {}
    $scope.kovetettUserek = {}

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