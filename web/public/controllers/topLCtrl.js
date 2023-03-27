app.controller("topLCtrl", function ($scope, database, $rootScope, $location) { 
   $scope.posts = [];
    database.select("posts", {}).then(function (res) {
        /*database.query("SELECT COUNT(posts.id) AS numOfPosts FROM users GROUP BY users.id")*/
        $scope.posts= res.data;
        for (let i = 0; i < res.length; i++) {
          $scope.post = {
            
          };
        } 
    });


    $scope.tops = [];
    database.selectAll("users", {}).then(function (res) {
        $scope.tops = res.data;
        for (let i = 0; i < res.length; i++) {
            $scope.top = {
                userID: res[i].id,
                username: res[i].username,
                points: res[i].points,
                img: res[i].img,
                posts: 0
            };
            $scope.tops.push($scope.top);
            //$scope.tops[i].posts = $scope.points[i].numOfPosts;
            console.log($scope.tops);
        }
    }).catch(function (err) {
        console.error(err);
    });
    
});
