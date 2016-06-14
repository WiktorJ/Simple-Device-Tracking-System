describe('mapController.js', function () {

    var $scope;
    var locationServiceMock = {};

    beforeEach(module('DeviceTrackingSystem'));
    
    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
    }));


    describe('mapController#routeRequest', function () {

        var locationDataMock = [
            {'latitude': 1, 'longitude': 2, 'stop': false, 'timestamp': 0, 'uid': 0},
            {'latitude': 3, 'longitude': 4, 'stop': false, 'timestamp': 1, 'uid': 0},
            {'latitude': 5, 'longitude': 6, 'stop': false, 'timestamp': 2, 'uid': 0}
        ];

        function before (items) {
            inject(function ($q, $controller) {
                locationServiceMock.getLocations = function () {
                    var deferred = $q.defer();
                    deferred.resolve(locationDataMock.slice(0, items));

                    return deferred.promise;
                };

                $controller('mapController', {
                    $scope: $scope,
                    locationService: locationServiceMock
                });
            });

        }

        it('should return empty routeRequest', function () {
            before(0);
            $scope.$digest();

            expect($scope.routeRequest).to.be.undefined;
        });

        it('should return routeRequest with the same origin and destination, and no way points', function () {
            before(1);
            $scope.$digest();

            expect($scope.routeRequest.origin).to.equal($scope.routeRequest.destination);
            expect($scope.routeRequest.waypoints).to.have.length(0);
        });

        it('should return routeRequest with different origin and destination, and no way points', function () {
            before(2);
            $scope.$digest();

            // Note that origin and destination could have the same latitude and longitude, but should be two different objects.
            expect($scope.routeRequest.origin).not.to.equal($scope.routeRequest.destination);
            expect($scope.routeRequest.waypoints).to.have.length(0);
        });

        it('should return routeRequest with different origin and destination, and one way point', function () {
            before(3);
            $scope.$digest();

            // Note the comment in the test above.
            expect($scope.routeRequest.origin).not.to.equal($scope.routeRequest.destination);

            // Check if start and end points have proper latitude and longitude (e.g. if not swapped).
            expect($scope.routeRequest.origin.lat()).to.equal(parseFloat(locationDataMock[0].latitude));
            expect($scope.routeRequest.origin.lng()).to.equal(parseFloat(locationDataMock[0].longitude));

            expect($scope.routeRequest.destination.lat()).to.equal(parseFloat(locationDataMock[2].latitude));
            expect($scope.routeRequest.destination.lng()).to.equal(parseFloat(locationDataMock[2].longitude));

            // Check for way points.
            expect($scope.routeRequest.waypoints).to.have.length(1);
        });

    });

});
