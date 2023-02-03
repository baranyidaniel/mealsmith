var app = new angular.module('mealsmithApp', ['ngRoute']);

app.run(function($rootScope) {

    $rootScope.settings = {};
    $rootScope.loggedUser = {};
    $rootScope.settings.appTitle = 'MealSmith';
    $rootScope.settings.company = 'Bajai SZC Türr István Technikum 2/14.SZFT';
    $rootScope.settings.author = 'RFG-HJK csapat';
    $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('mealsmithApp'));

});
angular.bootstrap(document, ['mealsmithApp']);
