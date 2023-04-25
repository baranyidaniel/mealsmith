app = new angular.module('mealsmithApp', ['ngRoute']);

app.run(function($rootScope, $location, database) {
    $rootScope.loggedUser = {};
    $rootScope.settings = {};
    $rootScope.settings.appTitle = 'MealSmith';
    $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('mealsmithApp'));

    $rootScope.showRecept = function(id) {
        $location.path('/receptek/' + id)
    }
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'receptCtrl'
        })
        .when('/reg', {
            templateUrl: 'views/reg.html',
            controller: 'userCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'userCtrl'
        })
        .when('/kedvencek', {
            templateUrl: 'views/kedvencek.html',
            controller: 'kedvencekCtrl'
        })
        .when('/koveteseim', {
            templateUrl: 'views/koveteseim.html',
            controller: 'kovetesCtrl'
        })
        .when('/toplista', {
            templateUrl: 'views/toplista.html',
            controller: 'topLCtrl'
        })
        .when('/profiles/:id', {
            templateUrl: 'views/profile.html',
            controller: 'profilCtrl'
        })
        .when('/receptek/:id', {
            templateUrl: 'views/recept.html',
            controller: 'receptLeirasCtrl'
        })
        .when('/ujrecept', {
            templateUrl: 'views/ujrecept.html',
            controller: 'ujReceptCtrl'
        })
        .when('/editprofile/:id', {
            templateUrl: 'views/editprofile.html',
            controller: 'editProfileCtrl'
        })
        .when('/editrecept/:id', {
            templateUrl: 'views/editrecept.html',
            controller: 'editReceptCtrl'
        })
        .otherwise({
			redirectTo: '/'
		})
});

app.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

app.service('fileUpload', function($http, $q) {

    this.uploadFile = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);

        var deffered = $q.defer();
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(
            function(res) {
                deffered.resolve(res);
            },
            function(err) {
                deffered.reject(err);
            }
        );
        return deffered.promise;
    }
});
