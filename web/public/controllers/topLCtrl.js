app.controller("topLCtrl", function ($scope, database, $rootScope, $location) {
  $scope.user = {};
  $scope.fill = function () {
    let data = {
      table: "users",
      points: $scope.user.points,
    };
    database;
  };
});
