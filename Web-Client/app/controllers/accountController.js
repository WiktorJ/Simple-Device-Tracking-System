app.controller('accountController', function ($scope, $location) {
    
    $("#logoutButton").hide();
    $("#showMapButton").hide();
    
    
    $scope.signOut = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        
        auth2.signOut().then(function () {
            console.log(auth2);
        });

        $("#logoutButton").hide();
        $("#showMapButton").hide();
    };
    
    $scope.showMap = function () {
        $location.path('/app/map').replace();
    };

});
