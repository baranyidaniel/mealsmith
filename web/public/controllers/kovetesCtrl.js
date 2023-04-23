app.controller("kovetesCtrl", function ($scope, database, $rootScope, $location, $route) {
    $scope.follows = []

    $scope.getFollows = function() {
        $scope.follows = []
        database.selectAll("follows").then(function(res) {
            let followed = res.data
            database.selectAll("users").then(function(res) {
                followed.forEach(item => {
                    if (item.user_id == $rootScope.loggedUser.id) {
                        $scope.follows.push(res.data.find(x => x.id == item.kovetett_user_id))
                    }
                })
            })
        })
    }

    $scope.removeFromFollow = function(id) {
        database.selectByValue("follows", "user_id", $rootScope.loggedUser.id).then(function(res){
            let tomb = res.data

            database.delete('follows', 'id', tomb.find(x => x.kovetett_user_id == id).id).then(function(res) {
                $scope.getFollows()
            })
        })
    }

    $scope.showProfile = function(id) {
        $location.path('/profiles/' + id)
    }

    $scope.getFollows()
});