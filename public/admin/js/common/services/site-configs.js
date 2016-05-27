angular.module( 'app.site-configs', [] ).provider( '$site-configs', function () {
    var globals = {
        API_BASE_URL: 'http://api.prode.local/'
    };
    return {
        getItem: function ( key ) {
            return globals[ key ];
        },
        $get: function () {
            return globals;
        }
    };
} );
