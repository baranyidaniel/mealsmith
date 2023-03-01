app.controller('profilCtrl', function($scope, database, $rootScope, $location, $routeParams, $filter) {

    $scope.user = {}
    $scope.userRecipes = {}    

    if ($routeParams.id != null){
        database.selectByValue('posts', 'id', $routeParams.id)
        .then(function(res) {
            $scope.userRecipes = res.data
            $scope.userRecipes = $filter('orderBy')($scope.receptek, '-points')
        })
    }
})