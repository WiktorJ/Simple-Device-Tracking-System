app.service('tokenPassingService', function () {

    var authToken;

    this.setAuthToken = function (token) {
        authToken = token;
    };

    this.getAuthToken = function () {
        return authToken;
    };

});
