angular.module( 'app.season', [ 'ui.router' ] ).config( [ "$stateProvider", function config( $stateProvider ) {
    $stateProvider.state( 'season', {
        url: '/season?id',
        templateUrl: 'modules/season/season.tpl.html',
        controller: 'SeasonCtrl',
        data: {
            pageTitle: 'Prode - Season',
            bodyClass: 'dashboard',
            isPublic: false
        }
    } );
} ] ).controller( 'SeasonCtrl', [ '$scope', '$uibModal', 'SeasonService', '$state', 'Notification', '$stateParams', function ( $scope, $uibModal, SeasonService, $state, Notification, $stateParams ) {
    var Season = {
        init: function () {
            var params = {
                    start: ( $scope.pagination.currentPage - 1 ) * $scope.pagination.itemsPerPage,
                    length: $scope.pagination.itemsPerPage,
                    // sortBy: $scope.sortBy.column,
                    // sortDir: $scope.sortBy.dir
                },
                season_id;
            if ( angular.isDefined( $stateParams.id ) ) {
                season_id = $stateParams.id;
            }
            Season.get();
        },
        get: function () {
            var promese = SeasonService.get();
            promese.then( function ( response ) {
                $scope.seasons = response.data.data.seasons;
            } );
        }
    };
    $scope.pagination = {
        totalItems: 20,
        currentPage: 1,
        itemsPerPage: 10,
        pageChange: function () {
            Season.get();
        }
    };
    $scope.seasons = {};
    Season.init();
} ] );
