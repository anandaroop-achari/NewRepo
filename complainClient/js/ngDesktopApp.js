(function () {
    'use strict';

    var ngApp = angular.module('ngApp',[ 'ngRoute', 'ui.bootstrap', 'angularMoment']);

    ngApp.constant('serverLocation', '');
    ngApp.constant('resourcesPath', '');
    jQuery.event.props.push('dataTransfer');
    ngApp.config(function ($controllerProvider) {
        // This will allow us to load controllers lazily
        ngApp.registerCtrl = $controllerProvider.register;
    });
    
    ngApp.factory('uuid', function() {
    var svc = {
        new: function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+"000000000").substr(2,8);
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },
         
        empty: function() {
          return '00000000-0000-0000-0000-000000000000';
        }
    };
     
    return svc;
});


    /**
     * A mock cordova library that does nothing. This way, we can re-use the same controllers for the mobile and desktop apps
     */
   

    ngApp.run(function ($rootScope, serverLocation) {
    	$rootScope.serverLocation = serverLocation;
    });
}());

