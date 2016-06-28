/* Based on: https://github.com/sttts/google-maps-mock */
/**
 * @file Defines mock of Google Maps API objects required for unit testing.
 */

window.google = {
    maps: {
        DirectionsRenderer: function () {
            return {};
        },

        DirectionsService: function (serviceObject) {
            return {
                map: function () { return serviceObject.map },
                route: function () { return {} }
            };
        },

        DirectionsStatus: {
            OK: function () { return {}; }
        },

        LatLng: function(lat, lng) {
            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),

                lat: function() { return this.latitude; },
                lng: function() { return this.longitude; }
            };
        },

        Map: function() {
            return {};
        },

        TravelMode: {
            WALKING: function () { return {} }
        }
    }
};
