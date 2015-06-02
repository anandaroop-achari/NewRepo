(function () {
    'use strict';

    var ngApp = angular.module('ngApp');

    ngApp.config(['$routeProvider', 'serverLocation', 'resourcesPath', function ($routeProvider, serverLocation, resourcesPath) {
        $routeProvider.when('/v_login', {
            templateUrl: serverLocation + resourcesPath + 'partials/vLogin.html',
            resolve: {
                loadController: function ($q, $rootScope) {
                    return loadController($q, $rootScope, serverLocation + resourcesPath + 'js/controllers/ctrlLogin.js');
                }
            }
        });
        $routeProvider.when('/v_logout', {
            templateUrl: serverLocation + resourcesPath + 'partials/vLogin.html',
            resolve: {
                loadController: function ($q, $rootScope) {
                    return loadController($q, $rootScope, serverLocation + resourcesPath + 'js/controllers/ctrlLogin.js');
                }
            }
        });
       
		$routeProvider.when('/v_Home', {
            templateUrl: serverLocation + resourcesPath + 'partials/vHome.html',
            resolve: {
                loadController: function ($q, $rootScope) {
                    return loadController($q, $rootScope, serverLocation + resourcesPath + 'js/controllers/ctrlHome.js');
                }
            }
        });
        $routeProvider.otherwise({
            templateUrl: serverLocation + resourcesPath + 'partials/vLogin.html',
            resolve: {
                loadController: function ($q, $rootScope) {
                    return loadController($q, $rootScope, serverLocation + resourcesPath + 'js/controllers/ctrlLogin.js');
                }
            }
        });
        
    }]);

    function loadController($q, $rootScope, controllerURL) {
        var deferred = $q.defer();
        var dependencies =
            $script([controllerURL], function () {
                // all dependencies have now been loaded by $script.js so resolve the promise
                $rootScope.$apply(function () {
                    deferred.resolve();
                });
            });

        return deferred.promise;
    }
}());