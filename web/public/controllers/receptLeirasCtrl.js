app.controller('receptLeirasCtrl', function($scope, $rootScope, database, $routeParams, $location) {
    $scope.recept = {}
    $scope.feltolto = {}
    $scope.newComment = ""
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

    $scope.getComments = function() {
        database.selectByValue('comments', 'post_id', $routeParams.id).then(function(res) {
            $scope.comments = res.data

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
        if ($scope.newComment != "") {
            let data = {
                post_id: $routeParams.id,
                user_id: $rootScope.loggedUser.id,
                comment: $scope.newComment
            }

            database.insert('comments', data).then(function(res) {
                if (res.data.affectedRows == 0) {
                    alert('Hiba')
                } 
                $scope.getComments()
            })
        }
    }
});