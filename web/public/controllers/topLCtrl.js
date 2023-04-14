app.controller("topLCtrl", function ($scope, database, $rootScope, $location) { 

    $scope.posts = [];
    $scope.tops = [];

    database.selectAll("posts").then(function (res) {
        $scope.posts = res.data;

        database.selectAll("users").then(function (res) {
            $scope.tops = res.data
            $scope.tops.forEach(item => {
                item.posts = $scope.getUserPosts(item.id)
            })
        })
    })

    $scope.getUserPosts = function(id) {
        let num = 0;

        $scope.posts.forEach(item => {
            if (item.user_id == id) num++
        });

        return num;
    }
});