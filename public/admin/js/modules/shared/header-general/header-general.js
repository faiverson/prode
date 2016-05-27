angular.module( 'app.header-general', [] ).controller( 'HeaderCtrl', [ '$scope', 'AuthService', function ( $scope, AuthService ) {
    $scope.vars = {
        isLoggedIn: function () {
            return AuthService.isLoggedIn();
        },
        getHeaderImage: function () {
            return '/assets/images/logo.png';
        }
    };
} ] );
