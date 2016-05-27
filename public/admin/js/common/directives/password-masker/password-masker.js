angular.module( 'ngPasswordMasker', [] ).directive( 'ngPasswordMask', [ '$timeout', '$window', function ( $timeout, $window ) {
    return {
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: function ( $scope, $elem, $attrs, ngModel ) {
            var vm = this,
                delay = 2000;
            $elem.on( 'keyup', function ( e ) {
                var len, _ref;
                if ( ( _ref = e.keyCode ) !== 13 && _ref !== 91 && _ref !== 18 && _ref !== 16 && _ref !== 17 && _ref !== 93 ) {
                    $timeout.cancel( $elem.data( 'show' ) );
                    if ( $elem.attr( 'type' ) === 'password' ) {
                        $elem.attr( {
                            'type': 'text'
                        } );
                        len = $elem.val().length;
                        $elem.get( 0 ).setSelectionRange( len, len );
                    }
                    return $elem.data( 'show', $timeout( function ( _this ) {
                        $elem.attr( {
                            'type': 'password'
                        } );
                        len = $elem.val().length;
                        return $elem.get( 0 ).setSelectionRange( len, len );
                    }, delay ) );
                }
            } );
        }
    };
} ] );
