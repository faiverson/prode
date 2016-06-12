angular.module( 'app.fixture', [ 'ui.router' ] ).config( [ "$stateProvider", function config( $stateProvider ) {
    $stateProvider.state( 'seasons.fixture', {
        url: '/fixture',
        templateUrl: 'modules/fixture/fixture.tpl.html',
        controller: 'FixtureCtrl',
        data: {
            pageTitle: 'Prode - Fixture',
            bodyClass: 'dashboard',
            isPublic: false
        }
    } ).state( 'seasons.fixture.id', {
        url: '/:fixture_id',
        templateUrl: 'modules/fixture/fixture.tpl.html',
        controller: 'FixtureCtrl',
        data: {
            pageTitle: 'Prode - Fixture',
            bodyClass: 'dashboard',
            isPublic: false
        }
    } );
} ] ).controller( 'FixtureCtrl', [ '$scope', 'CRUD', 'FixtureService', '$stateParams', 'Notification', function ( $scope, CRUD, FixtureService, $stateParams, Notification ) {
    var filters = angular.isDefined( $stateParams.season_id ) ? {
        'season_id': $stateParams.season_id
    } : {};
    angular.extend( $scope, {
        fixtures: {},
        table: CRUD.init( FixtureService, filters )
    } );
    $scope.rangeDates = {
        'autoApply': true,
        'timePicker': true,
        'opens': "left",
        'drops': "down",
        'timePickerSeconds': false
    };
    $scope.update = function () {
        $scope.table.refresh().then( function ( response ) {
            var result = response.data;
            if ( result.success ) {
                $scope.fixtures = result.data.fixtures;
            }
        } );
    };
    $scope.save_fixture = function ( fixture ) {
        $scope.table.save( fixture ).then( function ( response ) {
            Notification.success( 'Fixture updated!' );
        } );
    };
    $scope.update();
} ] );
