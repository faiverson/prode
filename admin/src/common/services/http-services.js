angular.module('app.http-services', ['app.site-configs', 'angular-jwt', 'app.shared-helpers'])

    .factory('AuthService', ['$http', '$q', '$site-configs', 'localStorageService', 'jwtHelper', '$objects', '$filter', '$rootScope', function ($http, $q, $configs, localStorageService, jwtHelper, $objects, $filter, $rootScope) {



        function isLoggedIn() {
            var token = localStorageService.get('token');

            return token !== null && angular.isDefined(token);
        }

        function getLoggedInUser() {
            var data = {};

            if (isLoggedIn()) {
                data = jwtHelper.decodeToken(localStorageService.get('token'));
            }

            return data;
        }

        function getUserPermissions() {
            var userData = getLoggedInUser();
            var permissions = [];

            if (angular.isUndefined(userData)) {
                return permissions;
            }

            angular.forEach(userData.roles, function (role) {
                permissions = permissions.concat(role.permissions);
            });

            return permissions;
        }

        function userHasPermission(perm) {
            var permissions = getUserPermissions();

            if (angular.isUndefined(perm)) {
                return true;
            }

            return ($filter('filter')(permissions, {name: perm}, true)).length > 0;
        }

        function logout() {
            var deferred = $q.defer();

            //TODO: implement logout request

            setTimeout(function () {
                localStorageService.clearAll();
                deferred.resolve();
            });

            return deferred.promise;
        }

        function forgotPassword(email) {
            var endpoint = $configs.API_BASE_URL + 'password';
            var deferred = $q.defer();

            function success(res) {
                deferred.resolve(res.data);
            }

            function error(err) {
                deferred.reject(err.data);
            }

            $http.post(endpoint, {email: email}).then(success, error);

            return deferred.promise;
        }

        function resetPassword(token, email, password, password_confirmation) {
            var endpoint = $configs.API_BASE_URL + 'password/reset';
            var deferred = $q.defer();

            function success(res) {
                if (res.data.success) {

                    // Set the token into local storage
                    localStorageService.set('token', res.data.data.token);
                    $rootScope.$broadcast("user-has-change");

                    deferred.resolve();
                } else {
                    deferred.reject(res);
                }
            }

            function error(err) {
                deferred.reject(err.data);
            }

            $http.post(endpoint, {
                token: token,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }).then(success, error);

            return deferred.promise;
        }

        function setUserToken(token) {
            // Set the token into local storage
            localStorageService.set('token', token);
            $rootScope.$broadcast("user-has-change");
        }

        return {
            login: function (username, password) {
                var endpoint = $configs.API_BASE_URL + 'admin/login',
                    deferred = $q.defer();

                $http({
                    url: endpoint,
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    withCredentials: false,
                    data: $objects.toUrlString({
                        username: username,
                        password: password
                    })
                }).then(function (response) {
                    if (response.data.success) {
                        localStorageService.set('token', response.data.data.token);
                        deferred.resolve();
                    } else {
                        deferred.reject(response.data);
                    }
                }, function (response) {
                    deferred.reject(response);
                });


                return deferred.promise;
            },
            getLoggedInUser: getLoggedInUser,
            isLoggedIn: isLoggedIn,
            logout: logout,
            userHasPermission: userHasPermission,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            setUserToken: setUserToken
        };
    }])

    .factory('UserService', ['$http', '$q', '$site-configs', function ($http, $q, $configs) {

        function signup(data) {
            var endpoint = $configs.API_BASE_URL + 'applications';
            var deferred = $q.defer();

            function success(res) {
                deferred.resolve(res);
            }

            function error(err) {
                deferred.reject(err.data);
            }

            $http.post(endpoint, data).then(success, error);

            return deferred.promise;
        }

        return {
            signup: signup,
			all: function () {
				var endpoint = $configs.API_BASE_URL + 'users';
				return $http.get(endpoint);
			}
        };
    }])

	.factory('ProspectService', ['$http', '$q', '$site-configs', function ($http, $q, $configs) {

		return {
			get: function (id) {
				var endpoint = $configs.API_BASE_URL + 'prospects/' + id;
				return $http.get(endpoint);
			},
			add: function (data) {
				var endpoint = $configs.API_BASE_URL + 'prospects';
				return $http.post(endpoint, data);
			}
		};
	}])

    .factory('httpRequestInterceptor', ['$q', 'localStorageService', '$location', 'jwtHelper', function ($q, localStorageService, $location, jwtHelper) {
        return {
            request: function ($config) {
                var header;
                $config.withCredentials = false;
                if ($config.notSendCredentials !== false) {
                    header = 'Bearer ' + localStorageService.get('token');
                    $config.headers.Authorization = header;
                }
                return $config;
            },
            responseError: function (rejection) {
                if ((rejection.status === 401 || rejection.status === 400) && rejection.data && (rejection.data.error === 'user_not_found' || rejection.data.error === "token_expired" || rejection.data.error === 'token_invalid')) {
                    localStorageService.set('token', null);
                    $location.path('/users/login');
                }

                if (rejection.status === 404) {
                    rejection.error = 'Oops! We cannot find what you are looking for!';
                }

                if (rejection.status === -1) {
                    // we need an oops page
                    rejection.error = 'Oops! Something is wrong!';
                }

                return $q.reject(rejection);
            }
        };
    }]);

