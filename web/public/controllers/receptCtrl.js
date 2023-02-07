app.controller('receptCtrl', function($scope, database, $rootScope, $location) {
    $scope.receptek = []

    database.selectAll('posts').then(function(res) {
        $scope.receptek = res.data;
    }) 
});