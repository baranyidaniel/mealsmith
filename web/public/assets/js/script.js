app = new angular.module('mealsmithApp', ['ngRoute']);

app.run(function($rootScope, $location, database) {
    $rootScope.loggedUser = {};
    $rootScope.settings = {};
    $rootScope.settings.appTitle = 'MealSmith';
    $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('mealsmithApp'));

    $rootScope.addToFavorites = function(id) {
        database.selectAll('favorites')
            .then(function(res) {
                
                res.data.forEach(item => {
                    
                });

                if (res.data.length > 0 && res.data[0].user_id == $rootScope.loggedUser.id) {
                    database.delete('favorites', 'post_id', id).then(function() {
                        console.log("törölve");
                        return
                    })
                } else {
                    let data = {
                        user_id: $rootScope.loggedUser.id,
                        post_id: id
                    }
    
                    database.insert('favorites', data).then(function() {
                        console.log("felvéve");
                        return
                    })

                }
                
            }
        )
    }

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
