angular.module( 'app.users', [ 'ui.router', 'angularMoment' ] ).config( [ "$stateProvider", function config( $stateProvider ) {
    $stateProvider.state( 'users', {
        url: '/users',
        templateUrl: 'modules/users/users.tpl.html',
        controller: 'UsersCtrl',
        data: {
            pageTitle: 'Credit Control - Users',
            bodyClass: 'admin',
            isPublic: true
        }
    } );
} ] ).controller( 'UsersCtrl', [ '$scope', '$uibModal', 'UserService', 'ProspectService', '$state', 'Notification', '$stateParams', '$objects', function ( $scope, $uibModal, UserService, ProspectService, $state, Notification, $stateParams, $objects ) {
    $scope.users = [];
    UserService.all().then( function ( response ) {
        $scope.users = response.data.data.users;
    }, function ( response ) {
        console.log( response );
    } );
    $scope.getUserInfo = function ( user ) {
        var modalInstance = $uibModal.open( {
            templateUrl: 'user-info.tpl.html',
            controller: 'UserInfoModalFormCtrl',
            size: 'lg',
            resolve: {
                user: function () {
                    console.log( user );
                    return user;
                }
            }
        } );
    };
    $scope.getProspectInfo = function ( prospect_id ) {
        var modalInstance = $uibModal.open( {
            templateUrl: 'prospect-info.tpl.html',
            controller: 'ProspectInfoModalFormCtrl',
            size: 'lg',
            resolve: {
                prospect_id: function () {
                    return prospect_id;
                }
            }
        } );
    };
} ] ).controller( 'UserInfoModalFormCtrl', [ '$scope', '$objects', '$uibModalInstance', 'Notification', 'user',
    function ( $scope, $objects, $uibModalInstance, Notification, user ) {
        $scope.user = angular.isDefined( user ) ? user : {};
        $scope.close = function () {
            $uibModalInstance.dismiss( 'close' );
        };
    }
] ).controller( 'ProspectInfoModalFormCtrl', [ '$scope', '$objects', '$uibModalInstance', 'Notification', 'ProspectService', 'prospect_id',
    function ( $scope, $objects, $uibModalInstance, Notification, ProspectService, prospect_id ) {
        $scope.prospect = {};
        ProspectService.get( prospect_id ).then( function ( response ) {
            $scope.prospect = response.data.data;
            $scope.prospect.id = prospect_id;
        }, function ( response ) {
            Notification.error( $objects.error( response ) );
        } );
        $scope.close = function () {
            $uibModalInstance.dismiss( 'close' );
        };
    }
] ).factory( 'UserSettings', [ 'localStorageService', function ( localStorageService ) {
    return {
        setSponsor: function ( sponsor ) {
            var sponsor_dt = moment().add( 14, 'days' ).format( 'YYYY-MM-DD' );
            localStorageService.set( 'sponsor', sponsor );
            localStorageService.set( 'sponsor_dt', sponsor_dt );
        },
        getSponsor: function () {
            var sponsor = localStorageService.get( 'sponsor' );
            var sponsor_dt = localStorageService.get( 'sponsor_dt' );
            if ( sponsor && sponsor_dt ) {
                if ( moment().isAfter( moment( sponsor_dt, 'YYYY-MM-DD' ) ) ) {
                    localStorageService.remove( 'sponsor' );
                    localStorageService.remove( 'sponsor_dt' );
                } else {
                    return sponsor;
                }
            }
            return null;
        }
    };
} ] );
