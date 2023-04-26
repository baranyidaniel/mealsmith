app.controller("topLCtrl", function ($scope, database) {
  $scope.posts = [];
  $scope.three = [];
  $scope.tops = [];
  $scope.top1 = [];
  $scope.top2 = [];
  $scope.top3 = [];
  $scope.index = 3;

  database.selectAll("posts").then(function (res) {
    $scope.posts = res.data;

    database.selectAll("users").then(function (res) {
      $scope.tops = res.data;
      $scope.tops.forEach((item) => {
        item.posts = $scope.getUserPosts(item.id);
      });

      //első külön vétele
      $scope.tops.sort(function (a, b) {
        return b.points - a.points;
      });
      $scope.top1.push.apply($scope.top1, $scope.tops.slice(0, 1));
      $scope.tops.splice(0, 1);

      //második külön vétele
      $scope.tops.sort(function (a, b) {
        return b.points - a.points;
      });
      $scope.top2.push.apply($scope.top2, $scope.tops.slice(0, 1));
      $scope.tops.splice(0, 1);

       //harmadik külön vétele
       $scope.tops.sort(function (a, b) {
        return b.points - a.points;
      });
      $scope.top3.push.apply($scope.top3, $scope.tops.slice(0, 1));
      $scope.tops.splice(0, 1);

    });
  });

  $scope.getUserPosts = function (id) {
    let num = 0;

    $scope.posts.forEach((item) => {
      if (item.user_id == id) num++;
    });

    return num;
  };
});
