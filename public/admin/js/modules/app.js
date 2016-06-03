angular.module( 'app.views', [ 'ui.router' ] );
angular.module( 'app', [ 'templates-app', 'app.header-general', 'app.auth', 'app.dashboard', 'app.season', 'app.fixture',
    // 'app.users',
    'ui-notification', 'ui.bootstrap', 'ui.bootstrap.tpls', 'app.confirmation-popup', 'LocalStorageModule',
    // 'ngAnimate',
    'angular-loading-bar', 'xtForm', 'ngAutodisable',
    // 'smoothScroll',
    // 'app.modal-prospect'
    'app.http-services', 'app.shared-directives', 'app.shared-filters'
] ).config( [ "$urlRouterProvider", "$locationProvider", "$httpProvider", "localStorageServiceProvider", "NotificationProvider",
    function appConfig( $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider, NotificationProvider ) {
        $urlRouterProvider.otherwise( 'login' );
        $httpProvider.interceptors.push( 'httpRequestInterceptor' );
        NotificationProvider.setOptions( {
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        } );
        localStorageServiceProvider.setPrefix( 'prode' );
        $locationProvider.html5Mode( true );
    }
] ).run( function () {} ).controller( 'AppCtrl', [ '$scope', '$state', 'UserService', 'AuthService', '$anchorScroll', '$location', '$uibModal', 'Notification', 'jwtHelper', 'localStorageService',
    function AppCtrl( $scope, $state, UserService, AuthService, $anchorScroll, $location, $uibModal, Notification, jwtHelper, localStorageService ) {
        function checkTokenExp() {
            var token = localStorageService.get( 'token' );
            var token_data, exp_date, iat_date, today;
            if ( !!token ) {
                token_data = jwtHelper.decodeToken( token );
                exp_date = moment.unix( token_data.exp );
                iat_date = moment.unix( token_data.iat );
                today = moment();
                if ( today.isAfter( exp_date ) ) {
                    localStorageService.set( 'token', null );
                    $state.go( 'login' );
                }
                if ( today.isAfter( exp_date.add( -2, 'd' ) ) ) {
                    AuthService.renewToken();
                }
            }
        }
        $scope.$on( '$stateChangeStart', function ( event, toState, toParams, fromState, fromParams ) {
            var perm = toState.data.permission;
            var redirectTo = toState.data.redirectTo;
            var isPublic = toState.data.isPublic;
            checkTokenExp();
            if ( !AuthService.isLoggedIn() && toState.name !== 'login' && angular.isUndefined( isPublic ) ) {
                event.preventDefault();
                $state.go( 'login' );
                return false;
            }
        } );
        $scope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
            if ( angular.isDefined( toState.data.pageTitle ) ) {
                $scope.pageTitle = toState.data.pageTitle;
            }
            $scope.bodyClass = toState.data.bodyClass || '';
            $scope.metas = toState.data.metas || {};
        } );
    }
] );
