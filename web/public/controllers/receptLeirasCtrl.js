app.controller('receptLeirasCtrl', function($scope, $filter, $rootScope, database, $routeParams, $location) {
    $scope.recept = {}
    $scope.feltolto = {}
    $scope.newComment = {}
    $scope.comments = []
    $scope.hozzavalok = []
    $scope.bekezdesek = []

    if ($routeParams.id != null){
        $scope.recept = {}

        database.selectByValue('posts', 'id', $routeParams.id).then(function(res) {
            $scope.recept = res.data[0]
            $scope.recept.ingredients.split('|').forEach(item => {
                let hv = {
                    "hozzavalo": item.split(';')[0],
                    "mennyiseg": item.split(';')[1]
                }
                $scope.hozzavalok.push(hv)
            })

            $scope.recept.description.split('\n').forEach(item => {
                $scope.bekezdesek.push({
                    item: item
                })
            });

            database.selectByValue('users', 'id', $scope.recept.user_id).then(function(res) {
                $scope.feltolto = res.data[0]
            })

            $scope.getComments()
        })
    }

    $scope.editRecept = function() {
        $location.path('/editrecept/' + $routeParams.id)
    }

    $scope.deleteRecept = function() {
        if (confirm('Biztosan törölni akarod ezt a receptet? Ez nem vonható vissza.')) {

            //recepttel kapcsolatos dolgok törlése...
            database.delete('comments', 'post_id', $routeParams.id).then(function() {
                database.delete('likes', 'post_id', $routeParams.id).then(function() {
                    database.delete('favorites', 'post_id', $routeParams.id).then(function() {
                        database.delete('posts', 'id', $routeParams.id).then(function() {
                            $location.path('/')
                        })
                    })
                })
            })
        }
    }

    $scope.deleteComment = function(id) {
        if (confirm('Biztosan törölni akarod a kommentet?')) {
            database.delete('comments', 'id', id).then(function(res) {
                $scope.getComments()
            })
        }
    }

    $scope.getComments = function() {
        database.selectByValue('comments', 'post_id', $routeParams.id).then(function(res) {
            $scope.comments = $filter('orderBy')(res.data, '-date')

            database.selectAll('users').then(function(res) {
                $scope.comments.forEach(comment => {
                    comment.poster = res.data.find(x => x.id == comment.user_id)
                });
            })
        })
    }

    $scope.elkeszites = function() {
        let ora = Math.floor($scope.recept.elkeszitesi_ido / 60)
        let perc = $scope.recept.elkeszitesi_ido % 60
        return `${ora != 0 ? ora + " óra" : ""} ${perc != 0 ? perc + " perc" : ""}`
    }

    $scope.showProfile = function(id) {
        $location.path('/profiles/' + id)
    }

    $scope.addComment = function() {
        if ($scope.newComment.comment == "" || $scope.newComment.comment.trim() == "") {
            alert('Írj be egy kommentet!')
        } else {
            let data = {
                post_id: $routeParams.id,
                user_id: $rootScope.loggedUser.id,
                comment: $scope.newComment.comment
            }

            database.insert('comments', data).then(function(res) {
                if (res.data.affectedRows == 0) {
                    alert('Hiba')
                } 
                $scope.newComment.comment = ""
                $scope.getComments()
            })
        }   
    }

    $scope.ido = function(datum) {
        moment.locale("hu")
        return moment(datum).calendar()
    }
});