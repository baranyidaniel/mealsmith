app = new angular.module('mealsmithApp', ['ngRoute']);

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
        .when('/kedvencek', {
            templateUrl: 'views/kedvencek.html',
            controller: 'kedvencekCtrl'
        })
        .when('/koveteseim', {
            templateUrl: 'views/follows.html',
            controller: 'userCtrl'
        })
        .when('/toplista', {
            templateUrl: 'views/toplista.html',
            controller: 'userCtrl'
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
        .otherwise({
			redirectTo: '/'
		})
    });
