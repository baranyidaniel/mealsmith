app.controller("editProfileCtrl", function ($scope, $routeParams, database, $rootScope, $location, $route) {
    

    $scope.backToProfile = function() {
        $location.path('/profiles/' + $routeParams.id)
    }
});