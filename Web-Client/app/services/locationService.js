/**
 * @file Defines AngularJS service used for making HTTP requests to external server in order to get users' locations.
 */

/**
 * @module services/locationService
 * @description Service module for performing HTTP request for location.
 */
app.service('locationService', function ($q, $http) {

    /**
     * @function getLocations
     * @param userID {Integer} User ID assigned to signed in user.
     * @param authToken {Object} OAuth 2.0 token for signed user's Google Account.
     * @param email {String} E-mail address of signed user.
     * @returns {Promise} JavaScript promise for deferred execution of HTTP request.
     * @description Performs HTTP request to external server in order to get locations of user with specified UserID and returns JavaScript Promise with retrieved data.
     */
    this.getLocations = function (userID, authToken, email) {
        var deferred = $q.defer();

        $http.get(
            'https://devices-tracking-server.herokuapp.com/location/users/' + userID,
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
