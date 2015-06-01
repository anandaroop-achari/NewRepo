/** 
 * PopUps Service
 * @return {[service]} popups
 * @author Anandroop
 */
(function () {
    'use strict';
    var ngApp = angular.module('ngApp');
    ngApp.factory('popups', function ($modal, $rootScope, $q, serverLocation, resourcesPath) {

        var popups = {};
        /**
         * Function to Show PopUp 
         * @param  String title
         * @param  String content
         * @param  function onConfirm
         * @param  function onCancel
         * @return void 
         */
        popups.show = function (ticket, onConfirm, onCancel) {
            var dialogScope = $rootScope.$new();
            dialogScope.ticket = ticket;
            dialogScope.submit = function(result){
                $modal.close(result);
                alert("");
                onConfirm(result);
              };
           
			popups.error = [];
			popups.complete = false;
			
            var newTicket = $modal.open( 
                {
                    templateUrl: serverLocation + resourcesPath + 'partials/vModalDialog.html',
                    controller: 'ctrlModalDialog',
                    //backdrop: 'static',
                    keyboard: 'false',
                    resolve:{
                    	loadController :  function($q, $rootScope){
                    		 var deferred = $q.defer();
                    	        var dependencies =
                    	            $script([serverLocation + resourcesPath + 'js/controllers/ctrlModalDialog.js'], function () {
                    	                // all dependencies have now been loaded by $script.js so resolve the promise
                    	                $rootScope.$apply(function () {
                    	                    deferred.resolve();
                    	                });
                    	            });

                    	        return deferred.promise;
                    	}
					},
                    scope: dialogScope
                }
            );
            dialogScope.hide = function(res) {
                newTicket.close();
                onConfirm(res);
			};
        };

        return popups;
    });
}());
