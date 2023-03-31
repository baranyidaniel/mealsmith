app.controller("kovetesCtrl", function ($scope, database, $rootScope, $location, $route) {
    $scope.follows = []

    $scope.getFavorites = function() {
        $scope.receptek = []

        database.selectAll('posts').then(function(res) {
            let posts = res.data
            database.selectAll('follows').then(function(res) {
                res.data.forEach(item => {
                    if (item.user_id == $rootScope.loggedUser.id) {
                        $scope.follows.push(posts.find(x => x.id == item.post_id))
                    }
                })

                $scope.determineLiked()
            })
        })

        database.selectAll('follows').then(function(res) {
            $scope.follows = res.data
        })
    }
});