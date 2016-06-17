app.controller('accountController', function ($scope, $location, tokenPassingService) {

    /** Hiding navigation buttons by default. **/

    $("#logoutButton").hide();
    $("#showMapButton").hide();
    

    /** Handling signing out of application. **/

    $scope.signOut = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        
        auth2.signOut().then(function () {
            console.log(auth2);
        });

        $("#logoutButton").hide();
        $("#showMapButton").hide();
    };


    /** Application routing. **/
    
    $scope.showMap = function () {
        tokenPassingService.setAuthToken($scope.authToken); // $scope.authToken passed by accountTemplate#onSignIn() function.
        $location.path('/app/map').replace();
    };

});
