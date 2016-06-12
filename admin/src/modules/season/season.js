angular.module('app.season', ['ui.router'])
    .config(function config($stateProvider) {
        $stateProvider
            .state('seasons', {
                url: '/seasons/:season_id',
                params: {
                    season_id: {
                        value: null,
                        squash: true
                    }
                },
                templateUrl: 'modules/season/season.tpl.html',
                controller: 'SeasonCtrl',
                data: {
                    pageTitle: 'Prode - Season',
                    bodyClass: 'dashboard',
                    isPublic: false
                }
            });
    })

    .controller('SeasonCtrl', ['$scope', 'CRUD', 'SeasonService', '$state', 'Notification', '$stateParams', function ($scope, CRUD, SeasonService, $state, Notification, $stateParams) {
        var filters = angular.isDefined($stateParams.season_id) ? {'season_id': $stateParams.season_id} : {};
        angular.extend($scope, {
            seasons: {},
            table: CRUD.init(SeasonService, filters)
        });

        $scope.update = function() {
            $scope.table.refresh().then(function (response) {
                var result = response.data;
                if(result.success) {
                    $scope.seasons = result.data.seasons;
                }
            });
        };

        $scope.update();

    }]);

