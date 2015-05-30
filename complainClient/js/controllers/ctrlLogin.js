(function () {
    'use strict';
 
    var ngApp = angular.module('ngApp');

    ngApp.registerCtrl('ctrlLogin', ['$scope', '$location', '$window',  function ($scope, $location, $window) {
        $scope.strUser = '';
        $scope.strPwd = '';
        $scope.isAdmin=false;
        $scope.fnLogin = function(){
        	var strUser = $scope.strUser;
            var strPwd = $scope.strPwd;
			var isAdmin = $scope.isAdmin;
            if (strUser.trim().length === 0 || strPwd.trim().length === 0) {
			    alert("Invalid input", "Please type in username and password to log in.");
            } else {
            	$window.sessionStorage['isAdmin'] = $scope.isAdmin;
            	$location.path('/v_Home');

            }
        }
    }]);

}());