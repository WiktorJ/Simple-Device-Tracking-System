app.service('locationService', function ($q, $http) {

    this.getLocations = function (userID) {
        var deferred = $q.defer();

        $http.get('https://devices-tracking-server.herokuapp.com/location/users/' + userID)
            .success(function (data) {
                deferred.resolve(data);
            });

        return deferred.promise;
    };

});
