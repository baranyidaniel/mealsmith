app.controller('receptCtrl', function($scope, database, $rootScope, $location) {
    $scope.receptek = []

    database.selectAll('posts').then(function(res) {
        $scope.receptek = res.data;
    }) 

    $scope.elkeszites = function(id) {
        let idx = $scope.receptek.findIndex(item => item.id === id);
        let ora = Math.floor($scope.receptek[idx].elkeszitesi_ido / 60)
        let perc = $scope.receptek[idx].elkeszitesi_ido % 60
        return `${ora} óra ${perc} perc`
    }
});