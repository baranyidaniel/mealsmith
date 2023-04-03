app.controller("kovetesCtrl", function ($scope, database, $rootScope, $location, $route) {
    $scope.follows = []

    database.selectAll("follows").then(function(res) {
        let followed = res.data
        database.selectAll("users").then(function(res) {
            followed.forEach(item => {
                if (item.user_id == $rootScope.loggedUser.id) {
                    $scope.follows.push(res.data.find(x => x.id == item.user_id))
                }
            })
        })
    })

});