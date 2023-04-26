app.controller('kartyaCtrl', function($scope, $rootScope, database, $location, $filter) {
    $scope.receptek = []
    $scope.favorites = []
    $scope.likes = []
    
    database.selectAll('posts').then(function(res) {
        $scope.receptek = res.data;
        $scope.receptek = $filter('orderBy')($scope.receptek, '-points')

        $scope.determineFavorited()
        $scope.determineLiked()
        $scope.getProfilePictures()
    })

    $scope.like = function(id) {
        if ($rootScope.loggedUser != null) {
            let recept = $scope.receptek.find(x => x.id == id)
        
            if (recept.liked) {
                recept.points--
                database.delete('likes', 'id', $scope.likes.find(x => x.post_id == id && x.user_id == $rootScope.loggedUser.id).id).then(function(res) {
                    database.update('posts', recept.id, {points: recept.points}).then(function(res) {
                        $scope.determineLiked()
                    })
                })
            } else {
                recept.points++
                let data = {
                    user_id: $rootScope.loggedUser.id,
                    post_id: id
                }

                database.insert('likes', data).then(function() {
                    database.update('posts', id, {points: recept.points}).then(function() {
                        database.update('users', recept.user_id, {points: recept.points}).then(function() {
                            $scope.determineLiked()
                        })
                    })
                })
            }
        }
    }

    $scope.addToFavorites = function(id) {
        if ($rootScope.loggedUser != null) {
            let recept = $scope.receptek.find(x => x.id == id)
            
            if (recept.favorited) {
                database.delete('favorites', 'id', $scope.favorites.find(x => x.post_id == id).id).then(function(res) {
                    $scope.determineFavorited()
                })
            } else {
                let data = {
                    user_id: $rootScope.loggedUser.id,
                    post_id: id
                }
    
                database.insert('favorites', data).then(function() {
                    $scope.determineFavorited()
                })
            }
        }
    }

    $scope.getProfilePictures = function() {
        database.selectAll('users').then(function(res) {
            $scope.receptek.forEach(item => {
                item.profilePic = res.data.find(x => x.id == item.user_id).img
            })
        })
    }

    $scope.determineFavorited = function() {
        if ($rootScope.loggedUser != null) {
            $scope.favorites = []
            database.selectAll('favorites').then(function(res) {
                $scope.favorites = res.data
    
                $scope.receptek.forEach(item => {
                    item.favorited = false
                    if ($scope.favorites.find(x => x.post_id == item.id && x.user_id == $rootScope.loggedUser.id)) {
                        item.favorited = true
                        document.getElementById('star_' + item.id).classList.replace('bi-star', 'bi-star-fill')
                    }
                });
            })
        }
    }

    $scope.determineLiked = function() {
        if ($rootScope.loggedUser != null) {
            $scope.likes = []
            database.selectAll('likes').then(function(res) {
                $scope.likes = res.data
    
                $scope.receptek.forEach(item => {
                    item.liked = false
                    if ($scope.likes.find(x => x.post_id == item.id && x.user_id == $rootScope.loggedUser.id)) {
                        item.liked = true
                        document.getElementById('heart_' + item.id).classList.replace('bi-heart', 'bi-heart-fill')
                    }
                });
       
            })
        }
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

    $scope.heartHover = function(id) {
        if (!$scope.receptek.find(x => x.id == id).liked) {
            document.getElementById('heart_' + id).classList.replace('bi-heart', 'bi-heart-fill')
        } else {
            document.getElementById('heart_' + id).classList.replace('bi-heart-fill', 'bi-heart')
        }
    }
    
    $scope.heartLeave = function(id) {
        if (!$scope.receptek.find(x => x.id == id).liked) {
            document.getElementById('heart_' + id).classList.replace('bi-heart-fill', 'bi-heart')
        } else {
            document.getElementById('heart_' + id).classList.replace('bi-heart', 'bi-heart-fill')
        }
    }

    $scope.starHover = function(id) {
        if (!$scope.receptek.find(x => x.id == id).favorited) {
            document.getElementById('star_' + id).classList.replace('bi-star', 'bi-star-fill')
        } else {
            document.getElementById('star_' + id).classList.replace('bi-star-fill', 'bi-star')
        }
    }
    
    $scope.starLeave = function(id) {
        if (!$scope.receptek.find(x => x.id == id).favorited) {
            document.getElementById('star_' + id).classList.replace('bi-star-fill', 'bi-star')
        } else {
            document.getElementById('star_' + id).classList.replace('bi-star', 'bi-star-fill')
        }
    }
});