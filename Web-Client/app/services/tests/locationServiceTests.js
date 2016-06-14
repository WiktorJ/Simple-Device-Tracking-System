describe('locationService.js', function () {

    var locationServiceInstance, $httpBackendMock;

    beforeEach(module('DeviceTrackingSystem'));

    beforeEach(inject(function (locationService, $httpBackend) {
        locationServiceInstance = locationService;
        $httpBackendMock = $httpBackend;
    }));


    describe('#getLocations', function () {

        it('exists', function () {
            expect(locationServiceInstance.getLocations).to.exist;
        });

        it('emptyResponseData', function () {
            $httpBackendMock
                .expect('GET', 'https://devices-tracking-server.herokuapp.com/location/users/0')
                .respond([]);

            locationServiceInstance.getLocations(0)
                .success(function (data) {
                    expect(data).to.have.length(0);
                });

            $httpBackendMock.flush();
        });
        
        it('ResponseDataNonZeroLength', function () {
            $httpBackendMock
                .expect('GET', 'https://devices-tracking-server.herokuapp.com/location/users/1')
                .respond([
                    {'latitude': 0, 'longitude': 0, 'stop': false, 'timestamp': 0, 'uid': 0},
                    {'latitude': 0, 'longitude': 0, 'stop': false, 'timestamp': 0, 'uid': 0}
                ]);

            locationServiceInstance.getLocations(1)
                .success(function (data) {
                    expect(data).to.have.length(2);
                });

            $httpBackendMock.flush();
        });

    });

});
