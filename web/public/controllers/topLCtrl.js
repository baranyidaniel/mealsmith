  app.controller("topLCtrl", function ($scope, database, $rootScope, $location) {
    $scope.tops =   [];
  database.selectAll("users", {}).then(function (res) {
    $scope.tops =res.data;
    for (let i = 0; i < res.length; i++) {
      $scope.top = {
        username: res[i].username,
        points: res[i].points
      };
      $scope.tops.push($scope.top);
      console.log($scope.tops);
    }
   
  }).catch(function (err) {
    console.error(err);
  });
});