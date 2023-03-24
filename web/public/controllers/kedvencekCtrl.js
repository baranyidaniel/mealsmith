app.controller('kedvencekCtrl', function($scope, $rootScope, database, $location, $filter) {
    $scope.receptek = []
    
    $scope.fill = function() {
        $scope.receptek = []
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

    $scope.removeFromFavorites = function(id) {
        database.selectAll('favorites')
            .then(function(res) {
                
                res.data.forEach(item => {
                    if (item.user_id == $rootScope.loggedUser.id && item.post_id == id) {
                        talalt = true
                        database.delete('favorites', 'post_id', id).then(function() {
                            $scope.fill()
                            return
                        })
                    }
                });
            }
        )
    }

    $scope.orderByLatest = function() {
        $scope.receptek = $filter('orderBy')($scope.receptek, '-datum')
    }

    $scope.orderByPoints = function() {
        $scope.receptek = $filter('orderBy')($scope.receptek, '-points')
    }

    $scope.heartHover = function(id) {
        document.getElementById('heart_' + id).classList.remove('bi-heart')
        document.getElementById('heart_' + id).classList.add('bi-heart-fill')
    }
    
    $scope.heartLeave = function(id) {
        document.getElementById('heart_' + id).classList.remove('bi-heart-fill')
        document.getElementById('heart_' + id).classList.add('bi-heart')
    }

    $scope.starHover = function(id) {
        document.getElementById('star_' + id).classList.remove('bi-star')
        document.getElementById('star_' + id).classList.add('bi-star-fill')
    }

    $scope.starLeave = function(id) {
        document.getElementById('star_' + id).classList.remove('bi-star-fill')
        document.getElementById('star_' + id).classList.add('bi-star')
    }

    $scope.fill()
});