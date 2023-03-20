app.controller('profilCtrl', function($scope, database, $rootScope, $location, $routeParams, $filter) {

    $scope.user = {}
    $scope.userRecipes = {}

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
})