app.controller('receptCtrl', function($scope, database, $routeParams, $location, $filter) {
    $scope.receptek = []

    database.selectAll('posts')
    .then(function(res) {
        $scope.receptek = res.data;
        $scope.receptek = $filter('orderBy')($scope.receptek, '-points')
    })

    if ($routeParams.id != null){
        $scope.recept = {}

        database.selectByValue('posts', 'id', $routeParams.id).then(function(res) {
            console.log(res.data[0]);
            $scope.recept = res.data[0]
        })

        console.log($scope.recept);
    }

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

    $scope.orderByLatest = function() {
        $scope.receptek = $filter('orderBy')($scope.receptek, '-datum')
    }

    $scope.orderByPoints = function() {
        $scope.receptek = $filter('orderBy')($scope.receptek, '-points')
    }

    $scope.showRecept = function(id) {
        $location.path('/receptek/'+id)
    }
});