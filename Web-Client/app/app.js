'use strict';

var app = angular.module('DeviceTrackingSystem', ['ngRoute', 'DeviceTrackingSystem.version']);


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/app/account', {
            templateUrl: 'templates/accountTemplate.html',
            controller: 'accountController'
        })

        .when('/app/map', {
            templateUrl: 'templates/mapTemplate.html',
            controller: 'mapController',
            loginRequired: true
        })
        
        .otherwise({
            redirectTo: '/app/account'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);

console.log("Client application started successfully.");
