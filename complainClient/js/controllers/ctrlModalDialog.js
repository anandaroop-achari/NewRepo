(function () {
    'use strict';
 
    var ngApp = angular.module('ngApp');

    ngApp.registerCtrl('ctrlModalDialog', ['$scope', '$location', '$window', 'httpHelper', function ($scope, $location, $window, httpHelper) {
        $scope.strUser = '';
        $scope.fnCreateTicket = function(){
        	var succFn = function(data){
        		console.log(data);
        		$scope.hide(data);
        	};
        	var errFn = function(err){

        	};
        	httpHelper.fnCreateTicket($scope.ticket, succFn, errFn);
        };
        $scope.fnUpdateTicket = function(){
        	var succFn = function(data){
        		console.log(data);
        		$scope.hide(data);
        	};
        	var errFn = function(err){

        	};
        	httpHelper.fnUpdateTicket($scope.ticket, succFn, errFn);
        	
        }

    }
    ]);
   }()); 