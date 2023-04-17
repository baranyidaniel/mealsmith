app.controller("topLCtrl", function ($scope, database) {
  $scope.posts = [];
  $scope.top3 = [];
  $scope.tops = [];

  database.selectAll("posts").then(function (res) {
    $scope.posts = res.data;

    database.selectAll("users").then(function (res) {
      $scope.tops = res.data;
      $scope.tops.forEach((item) => {
        item.posts = $scope.getUserPosts(item.id);
      });
    });
  });

  $scope.getUserPosts = function (id) {
    let num = 0;

    $scope.posts.forEach((item) => {
      if (item.user_id == id) num++;
    });

    return num;
  };

    $scope.tops.sort(function (a, b){
        return b.points - a.points;
    });
    $scope.top3.push.apply($scope.top3, $scope.tops.slice(0, 3));
    $scope.tops.splice(0, 3);
});
