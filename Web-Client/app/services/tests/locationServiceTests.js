/**
 * @file Describes unit test suites for locationService.
 */

describe('locationService.js', function () {

    var $httpBackendMock, defer, locationServiceInstance;

    beforeEach(module('DeviceTrackingSystem'));

    beforeEach(inject(function ($httpBackend, $q, locationService) {
        $httpBackendMock = $httpBackend;

        defer = $q.defer();
        locationServiceInstance = locationService;
    }));


    describe('locationService::getLocations', function () {

        it('should exist', function () {
            expect(locationServiceInstance.getLocations).to.exist;
        });

        it('should recognize empty response data', function () {
            var responseData;

            $httpBackendMock
                .whenGET('https://devices-tracking-server.herokuapp.com/location/users/0')
                .respond([]);

            locationServiceInstance.getLocations(0)
                .then(function (data) {
                    responseData = data;
                });

            $httpBackendMock.flush();
            expect(responseData).to.have.length(0);
        });
        
        it('should recognize non-empty response data', function () {
            var responseData;

            $httpBackendMock
                .whenGET('https://devices-tracking-server.herokuapp.com/location/users/1')
                .respond([
                    {'latitude': 0, 'longitude': 0, 'stop': false, 'timestamp': 0, 'uid': 1},
                    {'latitude': 0, 'longitude': 0, 'stop': false, 'timestamp': 1, 'uid': 1}
                ]);

            locationServiceInstance.getLocations(1)
                .then(function (data) {
                    responseData = data;
                });

            $httpBackendMock.flush();
            expect(responseData).to.have.length(2);
        });

    });

});
