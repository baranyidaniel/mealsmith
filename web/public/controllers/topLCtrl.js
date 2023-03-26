app.controller("topLCtrl", function($scope, database, $rootScope, $location) {
    var query =
        "SELECT users.*, COUNT(posts.id) AS numOfPosts FROM users LEFT JOIN posts ON users.id = posts.user_id GROUP BY users.id";
    $scope.tops = [];
    $scope.posts = [];
    database
        .query(query)
        .then(function(res) {
            $scope.posts = res.data;
        })
        .catch(function(err) {
            console.error(err);
        });
    database
        .selectAll("users", {})
        .then(function(res) {
            $scope.tops = res.data;
            for (let i = 0; i < res.length; i++) {
                $scope.top = {
                    userID: res[i].id,
                    username: res[i].username,
                    points: res[i].points,
                    img: res[i].img,
                };
                $scope.tops.push($scope.top);
                console.log($scope.tops);
            }
        })
        .catch(function(err) {
            console.error(err);
        });
});