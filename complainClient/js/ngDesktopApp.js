(function () {
    'use strict';

    var ngApp = angular.module('ngApp',[ 'ngRoute', 'ui.bootstrap']);

    ngApp.constant('serverLocation', '');
    ngApp.constant('resourcesPath', '');
    ngApp.constant('callFrom','Web');
    
    ngApp.config(function ($controllerProvider) {
        // This will allow us to load controllers lazily
        ngApp.registerCtrl = $controllerProvider.register;
    });
    
   

    /**
     * A mock cordova library that does nothing. This way, we can re-use the same controllers for the mobile and desktop apps
     */
   

    ngApp.run(function ($rootScope, serverLocation) {
    	$rootScope.serverLocation = serverLocation;
    });
}());

