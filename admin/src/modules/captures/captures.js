angular.module('app.captures', ['ui.router', 'angularMoment'])
    .config(function config($stateProvider) {
        $stateProvider
            .state('default', {
                url: '/?id',
                templateUrl: 'modules/captures/captures.tpl.html',
                controller: 'CaptureCtrl',
                data: {
                    pageTitle: 'Credit Control - Welcome',
                    bodyClass: 'capture',
                    isPublic: true
                }
            });
    })

    .controller('CaptureCtrl', ['$scope', '$uibModal', 'UserService', 'UserSettings', '$state', 'Notification', '$stateParams', function ($scope, $uibModal, UserService, UserSettings, $state, Notification, $stateParams) {
		var sponsor_id = UserSettings.getSponsor();
		if (angular.isDefined($stateParams.id)) {
			sponsor_id = $stateParams.id;
			UserSettings.setSponsor($stateParams.id);
		}

        $scope.openProviderReview = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'modules/modal/prospect.tpl.html',
                controller: 'ProspectModalFormCtrl',
                size: 'lg'
            });
        };
    }]);