angular.module( 'app.auth', [ 'ui.router', 'ngCookies', 'ngPasswordMasker' ] ).config( [ "$stateProvider", function config( $stateProvider ) {
    $stateProvider.state( 'login', {
        url: '/login',
        templateUrl: 'modules/auth/login.tpl.html',
        controller: 'LoginCtrl',
        data: {
            pageTitle: 'Login',
            bodyClass: 'narrow login',
            isPublic: true,
            metas: [ {
                name: 'title',
                content: 'Login'
            }, {
                name: 'description',
                content: 'This product and opportunity can be used by all of you to make a lot more money than you are right now, and set you up to make guaranteed money for life with just a little bit of focus and teamwork.'
            } ]
        },
        resolve: {
            qString: [ '$stateParams', function ( $stateParams ) {
                return {
                    email: $stateParams.email || ''
                };
            } ]
        }
    } ).state( 'signup', {
        url: '/signup?id&tag',
        templateUrl: 'modules/auth/signup.tpl.html',
        controller: 'SignUpCtrl',
        data: {
            pageTitle: 'Sign Up',
            bodyClass: 'narrow login',
            isPublic: true
        },
        resolve: {
            pageSettings: [ '$stateParams', '$cookies', function ( $stateParams, $cookies ) {
                var id = $stateParams.id,
                    tag = $stateParams.tag;
                if ( !$stateParams.id ) {
                    id = $cookies.get( 'enroller' ) || '1132319';
                }
                if ( !$stateParams.tag ) {
                    tag = $cookies.get( 'tag' ) || '';
                }
                var expireDate = new Date();
                expireDate.setDate( expireDate.getDate() + 14 );
                $cookies.put( 'enroller', id, {
                    expires: expireDate
                } );
                $cookies.put( 'tag', tag, {
                    expires: expireDate
                } );
                return {
                    funnel_id: 4,
                    enroller: id,
                    tag: tag
                };
            } ]
        }
    } ).state( 'logout', {
        url: '/logout',
        //templateUrl: 'modules/users/users.form.tpl.html',
        controller: 'LogoutController',
        data: {
            pageTitle: 'Login Page',
            bodyClass: 'narrow login'
        }
    } ).state( 'reset_password', {
        url: '/password/reset/:token',
        templateUrl: 'modules/auth/reset-pass.tpl.html',
        controller: 'ResetPasswordCtrl',
        data: {
            pageTitle: 'Reset Password',
            bodyClass: 'narrow login',
            isPublic: true
        }
    } );
} ] ).controller( 'LoginCtrl', [ '$scope', 'AuthService', '$state', 'Notification', '$uibModal', '$cookies', 'qString', function ( $scope, AuthService, $state, Notification, $uibModal, $cookies, qString ) {
    var vm = this;
    $scope.user = {
        email: qString.email
    };
    $scope.login = function () {
        if ( $scope.loginForm.$valid ) {
            AuthService.login( $scope.user.username, $scope.user.password ).then( function ( response ) {
                var user = AuthService.getLoggedInUser();
                $state.go( 'dashboard' );
            }, function ( result ) {
                Notification.error( result.error );
            } );
        } else {
            Notification.warning( 'Please check the information provided!' );
        }
    };
    $scope.openForgotPassword = function () {
        var modalInstance = $uibModal.open( {
            templateUrl: 'modules/auth/forgot-pass.tpl.html',
            controller: 'ForgotPasswordCtrl'
        } );
        modalInstance.result.then( function ( email ) {
            Notification.success( 'An E-mail has been sent to ' + email + ' with instructions to reset the Password!' );
        } );
    };
} ] ).controller( 'SignUpCtrl', [ '$scope', '$state', 'AuthService', 'Notification', 'pageSettings', function ( $scope, $state, AuthService, Notification, pageSettings ) {
    $scope.auth = {};
    $scope.enagic_id_placeholder = "Select an ID type below";
    $scope.updatePlaceholder = function () {
        if ( $scope.auth.enagic_id_type === 'id' ) {
            $scope.enagic_id_placeholder = "Enter Your Distributor ID";
        } else {
            $scope.enagic_id_placeholder = "Enter Your Online Order Number";
        }
    };
    $scope.send = function () {
        if ( $scope.form.$valid ) {
            $scope.auth.funnel_id = pageSettings.funnel_id;
            $scope.auth.enroller = pageSettings.enroller;
            $scope.auth.tag = pageSettings.tag;
            AuthService.signup( $scope.auth ).then( function ( result ) {
                $state.go( 'welcome' );
            }, function ( result ) {
                if ( result.error ) {
                    for ( var err in result.error ) {
                        Notification.error( result.error[ err ].join( '' ) );
                    }
                }
            } );
        }
    };
} ] ).controller( 'ForgotPasswordCtrl', [ '$scope', '$uibModalInstance', 'AuthService', 'Notification', function ( $scope, $uibModalInstance, AuthService, Notification ) {
    $scope.close = function () {
        $uibModalInstance.dismiss( 'close' );
    };
    $scope.send = function () {
        AuthService.forgotPassword( $scope.email ).then( function () {
            $uibModalInstance.close( $scope.email );
        }, function ( err ) {
            Notification.error( err.error );
        } );
    };
} ] ).controller( 'LogoutController', [ '$scope', 'AuthService', '$state', 'Notification', function ( $scope, AuthService, $state, Notification ) {
    var vm = this;
    AuthService.logout().then( function () {
        $state.go( 'login' );
    } );
} ] ).controller( 'ResetPasswordCtrl', [ '$scope', 'AuthService', 'Notification', '$state', '$stateParams', function ( $scope, AuthService, Notification, $state, $stateParams ) {
    $scope.send = function () {
        AuthService.resetPassword( $stateParams.token, $scope.auth.email, $scope.auth.password, $scope.auth.password_confirmation ).then( function ( res ) {
            var user = AuthService.getLoggedInUser();
            Notification.success( 'Password has been reset successfully!' );
            $state.go( 'webinar' );
        }, function ( err ) {
            Notification.error( err.error );
        } );
    };
} ] );
