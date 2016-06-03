angular.module('app.dashboard', ['ui.router'])
    .config(function config($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/dashboard.tpl.html',
                controller: 'DashboardCtrl',
                data: {
                    pageTitle: 'Prode - Dashboard',
                    bodyClass: 'dashboard',
                    isPublic: true
                }
            });
    })

    .controller('DashboardCtrl', ['$scope', '$uibModal', 'UserService', '$state', 'Notification', '$stateParams', function ($scope, $uibModal, UserService, $state, Notification, $stateParams) {
        // var sponsor_id = UserSettings.getSponsor();
        // if (angular.isDefined($stateParams.id)) {
			// sponsor_id = $stateParams.id;
			// UserSettings.setSponsor($stateParams.id);
        // }
        //
        // $scope.openProviderReview = function () {
        //     var modalInstance = $uibModal.open({
        //         templateUrl: 'modules/modal/prospect.tpl.html',
        //         controller: 'ProspectModalFormCtrl',
        //         size: 'lg'
        //     });
        // };
    }]);