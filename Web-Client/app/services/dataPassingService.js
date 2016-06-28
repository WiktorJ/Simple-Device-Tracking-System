/**
 * @file Defines AngularJS service used for passing signed user's account data between accountController and mapController.
 */

/**
 * @module services/dataPassingService
 * @description Service module for passing data between controllers.
 */
app.service('dataPassingService', function () {

    var authToken;
    var email;
    var uid;

    /**
     * @function setAuthToken
     * @param token {Object} OAuth 2.0 token for Google Account.
     * @description Assigns token passed as a parameter to service's variable.
     */
    this.setAuthToken = function (token) {
        authToken = token;
    };

    /**
     * @function getAuthToken
     * @returns {Object} OAuth 2.0 token for Google Account.
     * @description Returns token assigned to the service's variable.
     */
    this.getAuthToken = function () {
        return authToken;
    };


    /**
     * @function setEmail
     * @param mail {String} E-mail address of signed in user.
     * @description Assigns e-mail address passed as a parameter to service's variable.
     */
    this.setEmail = function (mail) {
        email = mail;
    };

    /**
     * @function getEmail
     * @returns {String} E-mail address of signed in user.
     * @description Returns e-mail address assigned to the service's variable.
     */
    this.getEmail = function () {
        return email;
    };


    /**
     * @function setUID
     * @param id {Integer} User ID assigned to signed in user.
     * @description Assigns User ID passed as a parameter to service's variable.
     */
    this.setUID = function (id) {
        uid = id;
    };

    /**
     * @function getUID
     * @returns {Integer} User IF assigned to signed in user.
     * @description Returns User ID assigned to the service's variable.
     */
    this.getUID = function () {
        return uid;
    };

});
