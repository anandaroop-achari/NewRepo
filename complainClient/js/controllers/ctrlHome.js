(function () {
    'use strict';
 
    var ngApp = angular.module('ngApp');

    ngApp.registerCtrl('ctrlHome', ['$scope', '$location', '$window',  function ($scope, $location, $window) {
        $scope.strUser = '';
        $scope.strPwd = '';
        $scope.isAdmin=false;
        $scope.fnNewComplain = function(){

            /*Open popup for new Complain*/
        };
        $scope.fnEditComplain = function(){
            /*Popup for editing existing complain*/
        };
        $scope.fnAssignTicket = function(){
            /*For admin select staff for one ticket*/
        };
        $scope.fnChangeStatus = function(){
            /*For admin to change the status of a ticket*/
        }
    }]);

}());