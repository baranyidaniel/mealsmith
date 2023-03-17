app.controller('kedvencekCtrl', function($scope, $rootScope, database, $location, $filter) {
    $scope.receptek = []

    $scope.feltolt = function() {
        database.selectByValue('favorites', 'user_id', $rootScope.loggedUser.id)
        .then(function(res) {
            let favorites = res.data;
            favorites.forEach(item => {
                database.selectByValue('posts', 'id', item.post_id).then(function(res) {
                    $scope.receptek.push(res.data[0])
                })
            })
        })
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

    $scope.showRecept = function(id) {
        $location.path('/receptek/' + id)
    }

    $scope.addToFavorites = function(id) {
        database.selectByValue('favorites', 'user_id', $rootScope.loggedUser.id)
            .then(function(res) {
                let tomb = res.data
                tomb.forEach(item => {
                    if (item.post_id == id) {
                        database.delete('favorites', 'post_id', id)
                        return
                    }
                })
                
                let data = {
                    user_id: $rootScope.loggedUser.id,
                    post_id: id
                }

                database.insert('favorites', data)
            }
        )
    }
});