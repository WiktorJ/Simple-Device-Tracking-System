/**
 * @file Defines AngularJS application structure and basic configuration.
 */

'use strict';

/**
 * @module app
 * @description Main module of AngularJS application.
 */
var app = angular.module('DeviceTrackingSystem', ['ngRoute', 'DeviceTrackingSystem.version']);

app.config(['$routeProvider', '$locationProvider',
    /**
     * @callback callback
     * @param $routeProvider {Object} Injected AngularJS provider.
     * @param $locationProvider {Object} Injected AngularJS provider.
     * @description Creates main application configuration, e.g. application routing.
     */
    function ($routeProvider, $locationProvider) {

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
