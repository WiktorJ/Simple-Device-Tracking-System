app.service('locationService', function ($q, $http) {

    this.getLocations = function (userID, authToken, email) {
        var deferred = $q.defer();

        $http.get(
            // 'https://devices-tracking-server.herokuapp.com/location/users/' + userID,
            'http://localhost:3000/location/users/' + userID,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                },
                params: {
                    email: email
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                console.log(data);
            });

        return deferred.promise;
    };

});
