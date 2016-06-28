/**
 * @file Describes unit test suites for dataPassingService.
 */

describe('dataPassingService.js', function () {

    var dataPassingServiceInstance;

    beforeEach(module('DeviceTrackingSystem'));

    beforeEach(inject(function (dataPassingService) {
        dataPassingServiceInstance = dataPassingService;
    }));


    describe('dataPassingService::authToken', function () {

        it('should exist', function () {
            expect(dataPassingServiceInstance.getAuthToken).to.exist;
            expect(dataPassingServiceInstance.setAuthToken).to.exist;
        });
        
        it('should set and return authorization token', function () {
            expect(dataPassingServiceInstance.getAuthToken()).to.undefined;

            var authTokenMock = 'dummyAuthToken';
            dataPassingServiceInstance.setAuthToken(authTokenMock);

            expect(dataPassingServiceInstance.getAuthToken()).to.equal.authTokenMock;
        });

    });

    describe('dataPassingService::email', function () {

        it('should exist', function () {
            expect(dataPassingServiceInstance.getEmail).to.exist;
            expect(dataPassingServiceInstance.setEmail).to.exist;
        });

        it('should set and return email', function () {
            expect(dataPassingServiceInstance.getEmail()).to.undefined;

            var emailMock = 'dummy@example.com';
            dataPassingServiceInstance.setEmail(emailMock);

            expect(dataPassingServiceInstance.getEmail()).to.equal.emailMock;
        });

    });

    describe('dataPassingService::uid', function () {

        it('should exist', function () {
            expect(dataPassingServiceInstance.getUID).to.exist;
            expect(dataPassingServiceInstance.setUID).to.exist;
        });

        it('should set and return UID', function () {
            expect(dataPassingServiceInstance.getUID()).to.undefined;

            var uidMock = 0;
            dataPassingServiceInstance.setUID(uidMock);

            expect(dataPassingServiceInstance.getUID()).to.equal.uidMock;
        });

    });

});