'use strict';

angular.module('DeviceTrackingSystem', ['ngRoute', 'DeviceTrackingSystem.version'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'});
    }])

    .controller('mainController', [function () {
        console.log("Client application started successfully.");

        /** Initializing a map. **/

        if(!map) {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 50.04, lng: 19.57},
                scrollwheel: false,
                zoom: 8
            });
        }

        console.log(map);


        /** Example of route directions drawing. **/
        
        function calculateAndDisplayRoute(directionsService, directionsDisplay, wayPoints) {
            directionsService.route({
                origin: new google.maps.LatLng(50.067609, 19.913262),
                destination: new google.maps.LatLng(50.054282, 19.935025),
                waypoints: wayPoints,
                travelMode: google.maps.TravelMode.WALKING
            }, function (response, status) {
                if(status === google.maps.DirectionsStatus.OK) {
                    console.log(response);
                    directionsDisplay.setDirections(response);
                }
                else {
                    console.log("FAILED due to: " + status + ".");
                }
            });
        }


        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        });

        var wayPoints = [
            {location: new google.maps.LatLng(50.062007, 19.936314), stopover: false},
            {location: new google.maps.LatLng(50.057755, 19.933725), stopover: false}
        ];

        calculateAndDisplayRoute(directionsService, directionsDisplay, wayPoints);

    }]);
