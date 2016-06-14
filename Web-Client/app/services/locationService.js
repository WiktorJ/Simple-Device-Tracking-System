app.service('locationService', function ($http) {

    this.getLocations = function (userID) {
        return $http.get("https://devices-tracking-server.herokuapp.com/location/users/" + userID);
    };

});
