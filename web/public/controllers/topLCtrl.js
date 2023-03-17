app.controller("topLCtrl", function ($scope, database, $rootScope, $location) {
  $scope.userPoints = {};
  $scope.users = {};
  $scope.db = [];
  database.selectAll("users").then(function (res) {
    $scope.users = res.data;
    for (let i = 0; i < $scope.users.length; i++) {
      $scope.db[i] = 1;
    }
  });

  $scope.fill = function () {
    let data = {
      table: "users",
      points: $scope.user.points,
    };
    database;
  };
});
