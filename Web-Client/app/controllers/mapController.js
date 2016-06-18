app.controller('mapController', function ($scope, $interval, $location, locationService, dataPassingService) {
    
    /** Initializing a map. **/

    if (!map) {
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

    var previouslyRetrievedData;

    var locationRequest = function () {
        locationService.getLocations(dataPassingService.getUID(), dataPassingService.getAuthToken())
            .then(
                function (data) {
                    // If there is no new entry for this user, return from this function.
                    if (typeof previouslyRetrievedData != 'undefined' && previouslyRetrievedData.length == data.length) {
                        return;
                    }

                    // Copy retrieved data as recently received (will be compared with data retrieved during next HTTP/GET request.
                    previouslyRetrievedData = data.slice();

                    var routeRequest;

                    if (data.length == 0) {
                        console.log("Nothing to show. There is no GPS data for this user.");
                    }
                    else if (data.length == 1) {
                        var singlePointCoordinates = new google.maps.LatLng(data[0].latitude, data[0].longitude);

                        routeRequest = {
                            origin: singlePointCoordinates,
                            destination: singlePointCoordinates,
                            waypoints: [],
                            travelMode: travelMode
                        };
                    }
                    else {
                        /** Google Maps API allow routes composed with at most 10 points. **/
                        data = data.slice(Math.max(0, data.length - 10));

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

                    $scope.routeRequest = routeRequest;
                    calculateAndDisplayRoute(routeRequest);
                },
                
                function (data) {
                    console.log("Error " + data);
                }
            );
    };

    locationRequest();
    // TODO: Poll server for location data periodically. Uncomment this line on production. Now commented because of economy reasons.
    // $interval(locationRequest, 5000);


    /** Route directions drawing. **/

    function calculateAndDisplayRoute(routeRequest) {
        directionsService.route(routeRequest, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
            else {
                console.log("Response to Google Maps API failed due to: " + status + ".");
            }
        });
    }
    
    
    /** Application routing. **/
    
    $scope.manageAccount = function () {
        $location.path('/app/account').replace();
    };

});
