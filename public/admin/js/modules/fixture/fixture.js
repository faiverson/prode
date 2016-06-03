angular.module( 'app.fixture', [ 'ui.router' ] ).config( [ "$stateProvider", function config( $stateProvider ) {
    $stateProvider.state( 'fixture', {
        url: '/fixture/:season_id',
        templateUrl: 'modules/fixture/fixture.tpl.html',
        controller: 'FixtureCtrl',
        data: {
            pageTitle: 'Prode - Fixture',
            bodyClass: 'dashboard',
            isPublic: true
        }
    } );
} ] ).controller( 'FixtureCtrl', [ '$scope', 'CRUD', 'FixtureService', '$stateParams', function ( $scope, CRUD, FixtureService, $stateParams ) {
    var filters = angular.isDefined( $stateParams.season_id ) ? {
        'season_id': $stateParams.season_id
    } : {};
    angular.extend( $scope, {
        fixtures: {},
        table: CRUD.init( FixtureService, filters )
    } );
    $scope.update = function () {
        $scope.table.update().then( function ( response ) {
            var result = response.data;
            if ( result.success ) {
                $scope.fixtures = result.data.fixtures;
            }
        } );
    };
    $scope.update();
} ] );
