app.controller('kartyaCtrl', function($scope, $rootScope, database, $location, $filter) {
    $scope.receptek = []

    database.selectAll('posts')
    .then(function(res) {
        $scope.receptek = res.data;
        $scope.receptek = $filter('orderBy')($scope.receptek, '-points')
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

    $scope.orderByLatest = function() {
        $scope.receptek = $filter('orderBy')($scope.receptek, '-datum')
    }

    $scope.orderByPoints = function() {
        $scope.receptek = $filter('orderBy')($scope.receptek, '-points')
    }

    $scope.addToFavorites = function(id) {
        database.selectAll('favorites')
            .then(function(res) {
                
                res.data.forEach(item => {
                    if (item.user_id == $rootScope.loggedUser.id && item.post_id == id) {
                        database.delete('favorites', 'post_id', id).then(function() {
                            return
                        })
                    }
                });

                let data = {
                    user_id: $rootScope.loggedUser.id,
                    post_id: id
                }

                database.insert('favorites', data).then(function() {
                    return
                })
            }
        )
    }

});