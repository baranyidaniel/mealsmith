app = new angular.module('mealsmithApp', ['ngRoute']);// levettem a "let"-et, mert a böngész consolja azt mondja már declarálva van.

app.run(function($rootScope) {
    $rootScope.loggedUser = {};
    $rootScope.settings = {};
    $rootScope.settings.appTitle = 'MealSmith';
    $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('mealsmithApp'));
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
        .when('/sajat', {
            templateUrl: 'views/sajat.html',
            controller: 'receptCtrl'
        })
        .when('/kedvencek', {
            templateUrl: 'views/favorites.html',
            controller: 'userCtrl'
        })
        .when('/koveteseim', {
            templateUrl: 'views/follows.html',
            controller: 'userCtrl'
        })
        .when('/top', {
            templateUrl: 'views/top.html',
            controller: 'userCtrl'
        })
        .otherwise({
			redirectTo: '/'
		})
    });
