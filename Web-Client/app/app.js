'use strict';

// Declare app level module which depends on views, and components
angular.module('DeviceTrackingSystem', ['ngRoute', 'DeviceTrackingSystem.version'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'});
    }])

    .controller('mainController', [function () {
        console.log("Client application started successfully.");
    }]);
