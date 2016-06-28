/**
 * @file Defines AngularJS controller used for Google Account management. Also defines data that are needed to pass to mapController.
 */

/**
 * @module controllers/accountController
 * @description Controller module for managing Google Account.
 */
app.controller('accountController', function ($scope, $location, dataPassingService) {

    /* Hiding navigation buttons by default. */

    $("#logoutButton").hide();
    $("#showMapButton").hide();
    

    /* Handling signing out of application. */
    /**
     * @callback callback
     * @description Manages signing out the application after clicking on the button. Uses Google Auth API.
     */
    $scope.signOut = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        
        auth2.signOut().then(function () {
            console.log(auth2);
        });

        $("#logoutButton").hide();
        $("#showMapButton").hide();
    };


    /* Application routing. */
    /**
     * @callback callback
     * @description Routes to Map View page and sets data required for passing between account- and map- controllers.
     */
    $scope.showMap = function () {
        dataPassingService.setAuthToken($scope.authToken); // $scope.authToken passed by accountTemplate#onSignIn() function.
        dataPassingService.setEmail($scope.email); // $scope.email passed by accountTemplate#onSignIn#onLoad() function.
        dataPassingService.setUID($scope.uid); // $scope.uid passed by accountTemplate#onSignIn#onLoad() function.
        $location.path('/app/map').replace();
    };

});
