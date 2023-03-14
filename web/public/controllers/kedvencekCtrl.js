app.controller('kedvencekCtrl', function($scope, $rootScope, database, $location, $filter) {
    $scope.receptek = []

    database.selectByValue('favorites', 'user_id', $rootScope.loggedUser.id)
    .then(function(res) {
        $scope.receptek = res.data;
        //$scope.receptek = $filter('orderBy')($scope.receptek, '-points')
    })

    $scope.elkeszites = function(id) {
        let idx = $scope.receptek.findIndex(item => item.id === id);
        let ora = Math.floor($scope.receptek[idx].elkeszitesi_ido / 60)
        let perc = $scope.receptek[idx].elkeszitesi_ido % 60
        return `${ora != 0 ? ora + " óra" : ""} ${perc != 0 ? perc + " perc" : ""}`
    }

    $scope.ido = function(id) {
        moment.locale("hu")
        let idx = $scope.receptek.findIndex(item => item.id === id)
        return moment($scope.receptek[idx].datum, "YYYYMMDD").fromNow()
    }

    $scope.showRecept = function(id) {
        $location.path('/receptek/' + id)
    }
});