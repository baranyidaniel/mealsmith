app.controller('profilCtrl', function($scope, database, $rootScope, $location, $routeParams, $filter) {

  $scope.user = {}
  $scope.userRecipes = []
  $scope.userFollowed = false

  $scope.determineFollowed = function() {
    database.selectByValue('follows', 'user_id', $rootScope.loggedUser.id).then(function(res) {
      if (res.data.find(x => x.kovetett_user_id == $routeParams.id)) {
        console.log('true');
        return true;
      }
      console.log('false');
      return false;
    })
  }
  
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

    if ($routeParams.id != $rootScope.loggedUser.id) {
      $scope.userFollowed = $scope.determineFollowed()
    }
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
    if ($scope.userFollowed) {
      let follows = []
      database.selectByValue('follows', 'user_id', $rootScope.loggedUser.id).then(function(res) {
        follows = res.data
        database.delete('follows', 'id', follows.find(x => x.kovetett_user_id == id).id).then(function() {
          alert('követés megszüntetve :)')
        })
      })
    }
    else 
    {
      let data = {
        user_id: $rootScope.loggedUser.id,
        kovetett_user_id: id
      }

      database.insert('follows', data).then(function() {
        return
      })
    }
  }
})