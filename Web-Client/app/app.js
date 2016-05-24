'use strict';

angular.module('DeviceTrackingSystem', ['ngRoute', 'DeviceTrackingSystem.version'])

    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'});
    })

    .controller('mainController', function ($http) {
        console.log("Client application started successfully.");

        /** Initializing a map. **/

        if(!map) {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 50.04, lng: 19.57},
                scrollwheel: false,
                zoom: 8
            });
        }


        /** Initializing map utils. **/

        var travelMode = google.maps.TravelMode.WALKING;

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        });


        /** HTTP request to the server and preparing data to display. **/

        var userID = 0;
        $http.get("https://devices-tracking-server.herokuapp.com/location/users/" + userID)
            .success(function (data) {
                var routeRequest;

                if(data.length == 0) {
                    console.log("Nothing to show. There is no GPS data for this user.");
                }
                else if(data.length == 1) {
                    var singlePointCoordinates = new google.maps.LatLng(data[0].latitude, data[0].longitude);

                    routeRequest = {
                        origin: singlePointCoordinates,
                        destination: singlePointCoordinates,
                        travelMode: travelMode
                    };
                }
                else {
                    var startPoint = data.shift();
                    var endPoint = data.pop();
                    var wayPoints = [];

                    data.forEach(function (wayPoint) {
                        wayPoints.push({
                            location: new google.maps.LatLng(wayPoint.latitude, wayPoint.longitude),
                            stopover: wayPoint.stop
                        })
                    });

                    routeRequest = {
                        origin: new google.maps.LatLng(startPoint.latitude, startPoint.longitude),
                        destination: new google.maps.LatLng(endPoint.latitude, endPoint.longitude),
                        waypoints: wayPoints,
                        travelMode: travelMode
                    };
                }

                calculateAndDisplayRoute(routeRequest);
            })
            .error(function (data) {
                console.log("Error " + data);
            });


        /** Route directions drawing. **/
        
        function calculateAndDisplayRoute(routeRequest) {
            directionsService.route(routeRequest, function (response, status) {
                if(status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
                else {
                    console.log("Response to Google Maps API failed due to: " + status + ".");
                }
            });
        }

    });
