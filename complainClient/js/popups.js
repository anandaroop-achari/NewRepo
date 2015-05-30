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
         * Function to Show PopUp with Bay No Submit Options
         * @param  String title
         * @param  String content
         * @param  function onConfirm
         * @param  function onCancel
         * @return void 
         */
        popups.show = function (title, content, onConfirm, onCancel) {
            var dialogScope = $rootScope.$new();
            dialogScope.title = title;
            dialogScope.content = content;
            dialogScope.submit = function(result){
                $modal.close(result);
              };
            popups.addBayNo = function(value) {
				dialogScope.bayNo = value;
			};
			popups.getBayNo = function() {
				return dialogScope.bayNo;
			};
			popups.addManAtBay = function(value) {
				dialogScope.manAtbay = value;
			};
			popups.getManAtBay = function() {
				return dialogScope.manAtbay;
			};
			popups.error = [];
			popups.complete = false;
			
            var scanner = $modal.open( //popup for main overlay - with text box and QR code scanning option//
                {
                    templateUrl: serverLocation + resourcesPath + 'partials/vModalDialog.html',
                    controller: 'ctrlModalDialog',
                    backdrop: 'static',
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
            	dialogScope.bayNo = res;
				scanner.close();
			};
			popups.bayNoCaptured = function(data) {
				scanner.close();
			};
        };
/**
 * Function to Open Canvas For Auto Scanning
 * @param  String title
 * @param  function onConfirm
 * @return void
 */
        popups.confirm = function (title, onConfirm) { // popup for additional canvas for QR scanning-camera access
            var dialogScope = $rootScope.$new();
            var confirmDialog = $modal.open(
                {
                    templateUrl: serverLocation + resourcesPath + 'partials/vScannerCanvas.html',
                    resolve:{
                    	loadController :  function($q, $rootScope){
                    		 var deferred = $q.defer();
                    	        var dependencies =
                    	            $script([serverLocation + resourcesPath + 'js/controllers/ctrlScanner.js'], function () {
                    	                $rootScope.$apply(function () {
                    	                    deferred.resolve();
                    	                });
                    	            });

                    	        return deferred.promise;
                    	}
					},
                    scope: dialogScope,
                    size: 'sm'
                }
            );
            confirmDialog.result.then(function (result) {
               // onConfirm();
            }, function () {
                if (onCancel) {
                    onCancel();
                }
            });
            dialogScope.hide = function(res) {
            	confirmDialog.close();
			};
			dialogScope.$on('scanSuccess', function(evt, data) { //Event caught after successful scan
				dialogScope.$destroy(); //destroying scope for ScannerCanvas
				confirmDialog.close();
				if(data !== ''){
					try{
						data = data.split(':')[1].trim().toUpperCase();
						onConfirm(data, 'n'); // callBack for canvas called
					} catch(e) {
						alerts.alert('Error','Incorrect format of captured bay number');
						return;
					}
				}
			});
        };

        return popups;
    });
}());
