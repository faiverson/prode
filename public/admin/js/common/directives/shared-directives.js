angular.module( 'app.shared-directives', [] ).directive( 'compareTo', function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function ( scope, element, attributes, ngModel ) {
            ngModel.$validators.compareTo = function ( modelValue ) {
                return modelValue === scope.otherModelValue;
            };
            scope.$watch( "otherModelValue", function () {
                ngModel.$validate();
            } );
        }
    };
} ).directive( 'clipboard', [ '$document', function ( $document ) {
    return {
        restrict: 'A',
        scope: {
            onCopied: '&',
            onError: '&',
            text: '='
        },
        link: function ( scope, element ) {
            function createNode( text ) {
                var node = document.createElement( 'textarea' );
                node.style.position = 'absolute';
                node.style.left = '-10000px';
                node.textContent = text;
                return node;
            }

            function copyNode( node ) {
                // Set inline style to override css styles
                document.body.style.webkitUserSelect = 'initial';
                var selection = document.getSelection();
                selection.removeAllRanges();
                node.select();
                //document.execCommand('copy');
                if ( !document.execCommand( 'copy' ) ) {
                    throw ( 'failure copy' );
                }
                selection.removeAllRanges();
                // Reset inline style
                document.body.style.webkitUserSelect = '';
            }

            function copyText( text ) {
                var node = createNode( text );
                document.body.appendChild( node );
                copyNode( node );
                document.body.removeChild( node );
            }
            element.on( 'click', function ( event ) {
                try {
                    copyText( scope.text );
                    if ( angular.isFunction( scope.onCopied ) ) {
                        scope.$evalAsync( scope.onCopied() );
                    }
                } catch ( err ) {
                    if ( angular.isFunction( scope.onError ) ) {
                        scope.$evalAsync( scope.onError( {
                            err: err
                        } ) );
                    }
                }
            } );
        }
    };
} ] ).directive( 'userCan', [ 'AuthService', function ( AuthService ) {
    return {
        restrict: 'A',
        link: function ( $scope, $elem, $attrs ) {
            function evaluatePerm() {
                if ( angular.isDefined( $attrs.userCan ) ) {
                    if ( !AuthService.userHasPermission( $attrs.userCan ) ) {
                        $elem.addClass( 'user-disable-action' );
                    } else {
                        $elem.removeClass( 'user-disable-action' );
                    }
                }
            }
            $scope.$on( "user-has-change", function ( nv, ov ) {
                evaluatePerm();
            } );
            evaluatePerm();
        }
    };
} ] ).directive( 'sortable', [ function () {
    return {
        restrict: 'A',
        scope: {
            currentSort: '=',
            currentDir: '='
        },
        link: function ( $scope, $elem, $attrs ) {
            $elem.addClass( 'sortable' );
            $scope.$watchCollection( '[currentSort, currentDir]', function () {
                $elem.removeClass( 'sortable-asc' );
                $elem.removeClass( 'sortable-desc' );
                if ( $scope.currentSort.toString() === $attrs.sortable ) {
                    if ( $scope.currentDir === 'asc' ) {
                        $elem.addClass( 'sortable-asc' );
                    } else {
                        $elem.addClass( 'sortable-desc' );
                    }
                }
            } );
        }
    };
} ] ).directive( 'sortColumn', [ function () {
    return {
        restrict: 'A',
        scope: {
            onSort: '&',
            sortData: '='
        },
        link: function ( $scope, $elem, $attrs ) {
            $elem.addClass( 'clickable' );
            $elem.bind( 'click', function () {
                $scope.sort( $attrs.sortColumn, $elem );
            } );
            $scope.sort = function ( col, elem ) {
                elem.removeClass( 'sort-desc' );
                elem.removeClass( 'sort-asc' );
                if ( $scope.sortData.hasOwnProperty( col ) ) {
                    if ( $scope.sortData[ col ] === 'asc' ) {
                        $scope.sortData[ col ] = 'desc';
                    } else if ( $scope.sortData[ col ] === 'desc' ) {
                        delete $scope.sortData[ col ];
                    }
                } else {
                    $scope.sortData[ col ] = 'asc';
                }
                if ( angular.isDefined( $scope.sortData[ col ] ) ) {
                    elem.addClass( 'sort-' + $scope.sortData[ col ] );
                }
                if ( angular.isFunction( $scope.onSort ) ) {
                    $scope.onSort();
                }
            };
        }
    };
} ] ).directive( 'ngChref', [ '$site-configs', function ( $configs ) {
    return {
        priority: 99,
        link: function ( scope, element, attr ) {
            attr.$observe( 'ngChref', function ( value ) {
                if ( !value ) {
                    return;
                }
                attr.$set( 'href', $configs.SECURE_URL + value );
            } );
        }
    };
} ] ).directive( 'alphanumOnly', [ function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ( scope, element, attrs, modelCtrl ) {
            modelCtrl.$parsers.push( function ( inputValue ) {
                if ( inputValue === undefined ) {
                    return '';
                }
                var transformedInput = inputValue.replace( /[^A-Za-z0-9\-]/g, '' );
                if ( transformedInput !== inputValue ) {
                    modelCtrl.$setViewValue( transformedInput );
                    modelCtrl.$render();
                }
                return transformedInput;
            } );
        }
    };
} ] ).directive( 'digitsOnly', [ function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ( scope, element, attrs, modelCtrl ) {
            modelCtrl.$parsers.push( function ( inputValue ) {
                if ( inputValue === undefined ) {
                    return '';
                }
                var transformedInput = inputValue.replace( /[^0-9\-]/g, '' );
                if ( transformedInput !== inputValue ) {
                    modelCtrl.$setViewValue( transformedInput );
                    modelCtrl.$render();
                }
                return transformedInput;
            } );
        }
    };
} ] ).directive( 'moneyInput', [ function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ( scope, element, attrs, modelCtrl ) {
            modelCtrl.$parsers.push( function ( inputValue ) {
                if ( inputValue === undefined ) {
                    return '';
                }
                var transformedInput = inputValue.replace( /[^0-9\.\,]/g, '' );
                if ( transformedInput !== inputValue ) {
                    modelCtrl.$setViewValue( transformedInput );
                    modelCtrl.$render();
                }
                return transformedInput;
            } );
        }
    };
} ] ).directive( 'autofocus', [ '$timeout', function ( $timeout ) {
    return {
        restrict: 'A',
        link: function ( $scope, $element ) {
            $timeout( function () {
                $element[ 0 ].focus();
            } );
        }
    };
} ] ).directive( 'csvDownload', [ '$site-configs', '$objects', '$window', '$timeout', 'UserService', function ( $configs, $objects, $window, $timeout, UserService ) {
    return {
        restrict: 'A',
        scope: {
            csvUid: '@',
            csvType: '@',
            getFilename: '&',
            filters: '='
        },
        link: function ( scope, element, attrs ) {
            var downloadFile = function downloadFile( csv ) {
                var filename = scope.getFilename()();
                if ( $window.navigator.msSaveOrOpenBlob ) {
                    var blob = new Blob( [ decodeURIComponent( encodeURI( csv ) ) ], {
                        type: "text/csv;charset=utf-8;"
                    } );
                    $window.navigator.msSaveBlob( blob, filename );
                } else {
                    var link = angular.element( '<a/>' );
                    link.attr( {
                        href: 'data:attachment/csv;base64,' + encodeURI( $window.btoa( csv ) ),
                        target: '_blank',
                        download: filename
                    } )[ 0 ].click();
                    $timeout( function () {
                        link.remove();
                    }, 50 );
                }
            };
            element.bind( 'click', function ( e ) {
                UserService.getAll( scope.csvUid, scope.csvType, {
                    filter: scope.filters
                } ).then( function ( csv ) {
                    downloadFile( csv );
                } );
                scope.$apply();
            } );
        }
    };
} ] ).directive( 'iframeSetDimensionsOnload', [ function () {
    return {
        restrict: 'A',
        link: function ( scope, element, attrs ) {
            element.on( 'load', function () {
                /* Set the dimensions here,
                 I think that you were trying to do something like this: */
                var iFrameHeight = element[ 0 ].contentWindow.document.body.scrollHeight + 'px';
                var iFrameWidth = '100%';
                element.css( 'width', iFrameWidth );
                element.css( 'height', iFrameHeight );
            } );
        }
    };
} ] ).directive( 'betaTimer', [ '$site-configs', '$objects', '$interval', function ( $configs, $objects, $interval ) {
    return {
        restrict: 'E',
        //transclude: true,
        scope: {
            date: '@',
            align: '@'
        },
        template: '<div class="pull-{{betaRelease.align}}">' + '<span>days <i>{{betaRelease.duration.days() | pad}}</i></span>' + '<span>hours <i>{{betaRelease.duration.hours() | pad}}</i></span>' + '<span>min <i>{{betaRelease.duration.minutes() | pad}}</i></span>' + '<span>sec <i>{{betaRelease.duration.seconds() | pad}}</i></span>' + '</div>',
        link: function ( scope, element, attrs ) {
            scope.betaRelease = {};
            scope.betaRelease.tz = 'America/New_York';
            scope.betaRelease.align = scope.align;
            scope.betaRelease.date = moment.tz( scope.date, scope.betaRelease.tz );
            scope.betaRelease.diff = scope.betaRelease.date.diff( moment().tz( scope.betaRelease.tz ) );
            scope.betaRelease.duration = moment.duration( scope.betaRelease.diff );
            scope.betaRelease.interval = 1000;
            scope.startTimer = function () {
                scope.betaRelease.stopTime = $interval( scope.updateTime, scope.betaRelease.interval );
            };
            scope.updateTime = function () {
                scope.betaRelease.diff = scope.betaRelease.date.diff( moment().tz( scope.betaRelease.tz ) );
                scope.betaRelease.duration = moment.duration( scope.betaRelease.diff );
            };
            scope.startTimer();
        }
    };
} ] );
