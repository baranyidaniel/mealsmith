app.controller('topLCtrl',['$scope', 'dbfactory','database', '$rootScope', '$location', function($scope, dbFactory, database, $rootScope, $location) {
$scope.tops = [];
  
  $scope.fill = function () {
    let data = {
      points : database.selectAll('users', data).then(function(res) {
        if(res.data.affectedRows != 0){
          let 
        }
      })
    };
  }}]);