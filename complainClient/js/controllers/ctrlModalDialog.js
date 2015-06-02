(function () {
    'use strict';
 
    var ngApp = angular.module('ngApp');

    ngApp.registerCtrl('ctrlModalDialog', ['$scope', '$location', '$window', 'httpHelper', function ($scope, $location, $window, httpHelper) {
       $scope.user = JSON.parse($window.sessionStorage['currentUser']);
        $scope.isAdmin= $scope.user.admin;
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
            if($scope.ticket.status === 'open' && !$scope.isAdmin){
                $scope.ticket.status = 'new';
                $scope.ticket.assignedTo = '';
            }
        	httpHelper.fnUpdateTicket($scope.ticket, succFn, errFn);
        	
        };
        $scope.fnCloseTicket = function(){
            $scope.ticket.status = 'closed';
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