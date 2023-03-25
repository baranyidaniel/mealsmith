  app.controller("topLCtrl", function ($scope, database, $rootScope, $location) {
    $scope.tops = [];
  database.selectAll("users", {}).then(function (res) {
    $scope.tops =res.data;
    for (let i = 0; i < res.length; i++) {
      $scope.top = {
        userID: res[i].id,
        username: res[i].username,
        points: res[i].points,
        img:res[i].img
      };
      $scope.tops.push($scope.top);
      console.log($scope.tops);
    }
   
  }).catch(function (err) {
    console.error(err);
  });
  //Alább a postok száma lesz meghatározva
  /*
  database.selectAll("posts", {}).then(function (res) {
    $scope.tops =res.data;
    for (let i = 0; i < res.length; i++) {
      $scope.top = {
       posts:res[i].
      };
      $scope.tops.push($scope.top);
      console.log($scope.tops);
    }
   
  }).catch(function (err) {
    console.error(err);
  });*/
});