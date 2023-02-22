app.controller('profilCtrl', function($scope, database, $rootScope, $location) {

    $scope.user = {}
    $scope.userRecipes = {}
    
    database.selectAll('users')
    .then(function(res) {
        $scope.user = res.data[0]
    })

    database.selectByValue('posts', 'id', '1')
    .then(function(res) {
        $scope.userRecipes = res.data
        $scope.userRecipes = $filter('orderBy')($scope.receptek, '-points')
    })
})