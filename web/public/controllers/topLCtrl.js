app.controller("topLCtrl", function ($scope, database, $rootScope, $location) { 

    $scope.posts = [];
    database.selectAll("posts", {}).then(function (res) {
        $scope.posts = res.data;
        for (let i = 0; i < res.length; i++) {
            $scope.post = {
                id: res[i].id,
                uid: res[i].userid
            };
            var tempArr = ($scope.posts).filter(function(d){
                return (d.select == uid);
           });
           console.log(tempArr);
            $scope.posts.push($scope.post);
            console.log($scope.posts);
        }
    }).catch(function (err) {
        console.log(err);
    });



    $scope.tops = [];
    database.selectAll("users", {}).then(function (res) {
        $scope.tops = res.data;
        for (let i = 0; i < res.length; i++) {
            $scope.top = {
                id: res[i].id,
                username: res[i].username,
                points: res[i].points,
                img: res[i].img,
                posts: 0
            };
             $scope.tops = angular.extend($scope.posts)
            $scope.tops.push($scope.top);
            console.log($scope.tops);
        }
    }).catch(function (err) {
        console.log(err);
    });
});
