app.controller("topLCtrl", ["$scope", "dbfactory", "database", "$rootScope", "$location", function ($scope, dbFactory, database, $rootScope, $location) {
  database.selectAll("users", {}).then(function (res) {
    $scope.tops = [];
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
}]);