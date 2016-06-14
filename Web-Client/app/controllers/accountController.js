app.controller('accountController', function ($scope, $location) {

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
        $location.path('/app/map').replace();
    };

});
