app.controller('accountController', function ($scope, $location, dataPassingService) {

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
        dataPassingService.setAuthToken($scope.authToken); // $scope.authToken passed by accountTemplate#onSignIn() function.
        dataPassingService.setEmail($scope.email); // $scope.email passed by accountTemplate#onSignIn#onLoad() function.
        dataPassingService.setUID($scope.uid); // $scope.uid passed by accountTemplate#onSignIn#onLoad() function.
        $location.path('/app/map').replace();
    };

});
