'use strict';

angular.module('DeviceTrackingSystem', ['ngRoute', 'DeviceTrackingSystem.version'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'});
    }])

    .controller('mainController', [function () {
        console.log("Client application started successfully.");

        // TODO: Check an order of scripts loading. Map is not loading at the first time when page is loaded.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 50.04, lng: 19.57},
            scrollwheel: false,
            zoom: 8
        });

        console.log(map);
    }]);
