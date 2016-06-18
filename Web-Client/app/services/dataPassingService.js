app.service('dataPassingService', function () {

    var authToken;
    var email;
    var uid;

    
    this.setAuthToken = function (token) {
        authToken = token;
    };

    this.getAuthToken = function () {
        return authToken;
    };


    this.setEmail = function (mail) {
        email = mail;
    };

    this.getEmail = function () {
        return email;
    };


    this.setUID = function (id) {
        uid = id;
    };
    
    this.getUID = function () {
        return uid;
    };

});
