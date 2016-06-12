angular.module( 'app.games', [ 'ui.router' ] ).config( [ "$stateProvider", function config( $stateProvider ) {
    $stateProvider.state( 'games', {
        url: '/fixture/:fixture_id/games',
        parent: 'seasons',
        templateUrl: 'modules/games/games.tpl.html',
        controller: 'GamesCtrl',
        data: {
            pageTitle: 'Prode - Games',
            bodyClass: 'dashboard',
            isPublic: false
        }
    } );
} ] ).controller( 'GamesCtrl', [ '$scope', 'CRUD', 'GameService', '$stateParams', 'Notification', function ( $scope, CRUD, GameService, $stateParams, Notification ) {
    var filters = angular.isDefined( $stateParams.season_id ) ? {
        'season_id': $stateParams.season_id
    } : {};
    if ( angular.isDefined( $stateParams.fixture_id ) ) {
        filters.fixture_id = $stateParams.fixture_id;
    }
    filters.pagination = {
        items: 20
    };
    angular.extend( $scope, {
        games: {},
        table: CRUD.init( GameService, filters )
    } );
    $scope.update = function () {
        $scope.table.refresh().then( function ( response ) {
            var result = response.data;
            if ( result.success ) {
                $scope.games = result.data.games;
            }
        } );
    };
    $scope.save_all = function () {
        $scope.table.save( {
            'games': $scope.games,
            'fixture_id': filters.fixture_id,
            'season_id': filters.season_id
        } ).then( function ( response ) {
            Notification.success( 'Games updated!' );
        } );
    };
    $scope.save_game = function ( game ) {
        $scope.table.save( {
            'games': [ game ],
            'fixture_id': filters.fixture_id,
            'season_id': filters.season_id
        } ).then( function ( response ) {
            Notification.success( 'Game updated!' );
        } );
    };
    $scope.update();
} ] );
