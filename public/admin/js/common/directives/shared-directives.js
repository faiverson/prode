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
} ] ).directive( 'sortColumn', [ 'CRUD', function ( CRUD ) {
    return {
        restrict: 'A',
        scope: {
            onSort: '&',
        },
        link: function ( $scope, $elem, $attrs ) {
            if ( !CRUD.filters.hasOwnProperty( 'sorting' ) || angular.isUndefined( CRUD.filters.sorting ) ) {
                CRUD.filters.sorting = {};
            }
            $elem.addClass( 'clickable' );
            $elem.bind( 'click', function () {
                $scope.sort( $attrs.sortColumn, $elem );
            } );
            $scope.sort = function ( col, elem ) {
                elem.removeClass( 'sort-desc' ).removeClass( 'sort-asc' );
                if ( CRUD.filters.sorting.hasOwnProperty( col ) ) {
                    if ( CRUD.filters.sorting[ col ] === 'asc' ) {
                        CRUD.filters.sorting[ col ] = 'desc';
                    } else if ( CRUD.filters.sorting[ col ] === 'desc' ) {
                        delete CRUD.filters.sorting[ col ];
                    }
                } else {
                    CRUD.filters.sorting[ col ] = 'asc';
                }
                if ( angular.isDefined( CRUD.filters.sorting[ col ] ) ) {
                    elem.addClass( 'sort-' + CRUD.filters.sorting[ col ] );
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
} ] ).directive( 'daterangepicker', function () {
    return {
        restrict: 'E',
        template: '<div class="input-group datefilter"><span class="input-group-addon"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></span><input type="datefilter" ></div>',
        require: 'ngModel',
        replace: true,
        link: function ( $scope, elem, $attrs, modelController ) {
            var model = $attrs.ngModel,
                options = $scope.$parent[ model ];
            elem.daterangepicker( options, function ( start_at, end_at, label ) {
                $scope.$apply( function () {
                    $scope.fixture.start_at = start_at.format( 'YYYY-MM-DD HH:mm a' );
                    $scope.fixture.end_at = end_at.format( 'YYYY-MM-DD HH:mm a' );
                } );
            } );
        }
    };
} ).directive( 'iframeSetDimensionsOnload', [ function () {
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
} ] );
