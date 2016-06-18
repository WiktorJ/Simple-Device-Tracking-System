app.service('dataPassingService', function () {

    var authToken;
    var uid;

    
    this.setAuthToken = function (token) {
        authToken = token;
    };

    this.getAuthToken = function () {
        return authToken;
    };
    
    
    this.setUID = function (id) {
        uid = id;
    };
    
    this.getUID = function () {
        return uid;
    };

});
