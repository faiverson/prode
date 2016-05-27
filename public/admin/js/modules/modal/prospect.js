angular.module( 'app.modal-prospect', [] ).controller( 'ProspectModalFormCtrl', [ '$scope', '$stateParams', '$objects', '$uibModalInstance', 'Notification', '$state', 'ProspectService',
    function ( $scope, $stateParams, $objects, $uibModalInstance, Notification, $state, ProspectService ) {
        console.log( $stateParams );
        $scope.save = function () {
            var prom;
            if ( $scope.prospectForm.$valid ) {
                $scope.prospect.entered_id = $stateParams.id;
                prom = ProspectService.add( $scope.prospect );
                prom.then( function ( response ) {
                    var prospect = response.data.data;
                    Notification.success( 'You are now in credit control! Welcome ' + prospect.first_name );
                    $uibModalInstance.close( prospect );
                }, function ( response ) {
                    Notification.error( $objects.error( response ) );
                } );
            }
            return prom;
        };
        $scope.close = function () {
            $uibModalInstance.dismiss( 'close' );
        };
    }
] );
