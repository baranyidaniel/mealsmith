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
        .otherwise({
			redirectTo: '/'
		})
});
