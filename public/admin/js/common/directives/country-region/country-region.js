angular.module( 'ngCountryRegion', [] ).directive( 'ngCountry', [ '$timeout', '$window', function ( $timeout, $window ) {
    return {
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: function ( $scope, $elem, $attrs, ngModel ) {
            var vm = this;
            $elem.addClass( 'crs-country' );
            $window.crs.init();
            $scope.$watch( function () {
                return ngModel.$modelValue;
            }, function ( newValue, oldValue ) {
                if ( newValue === undefined ) {
                    newValue = 'United States';
                }
                if ( newValue !== oldValue ) {
                    $timeout( function () {
                        $elem.val( newValue ).trigger( 'change' );
                    }, 500 );
                }
            } );
        }
    };
} ] ).directive( 'ngRegion', [ '$timeout', function ( $timeout ) {
    return {
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: function ( $scope, $elem, $attrs, ngModel ) {
            $scope.$watch( function () {
                return ngModel.$modelValue;
            }, function ( newValue ) {
                $timeout( function () {
                    $elem.val( newValue ).trigger( 'change' );
                }, 500 );
            } );
        }
    };
} ] );
