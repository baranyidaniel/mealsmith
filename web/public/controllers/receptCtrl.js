app.controller('receptCtrl', function($scope, database, $rootScope, $location) {
    $scope.receptek = []
    $scope.legfrissebb = []

    database.selectAll('posts')
    .then(function(res) {
        $scope.receptek = res.data;
    })
    .then(function() {
        $scope.legfrissebb = $scope.receptek.sort(function(a,b){
            return new Date(b.datum) - new Date(a.datum);
        });
    })

    $scope.elkeszites = function(id) {
        let idx = $scope.receptek.findIndex(item => item.id === id);
        let ora = Math.floor($scope.receptek[idx].elkeszitesi_ido / 60)
        let perc = $scope.receptek[idx].elkeszitesi_ido % 60
        return `${ora} óra ${perc} perc`
    }

    $scope.ido = function(id) {
        moment.locale("hu")
        let idx = $scope.receptek.findIndex(item => item.id === id)
        return moment($scope.receptek[idx].datum, "YYYYMMDD").fromNow()
    }
});