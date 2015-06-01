(function () {
    'use strict';
 
    var ngApp = angular.module('ngApp');

    ngApp.registerCtrl('ctrlLogin', ['$scope', '$location', '$window', 'httpHelper', function ($scope, $location, $window, httpHelper) {
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

            httpHelper.fnLogin(strUser, strPwd, isAdmin, function(data){
            	$window.sessionStorage['isAdmin'] = $scope.isAdmin;
                $window.sessionStorage['currentUser'] = JSON.stringify(data[0]);
            	$location.path('/v_Home');
            }, function(){

            });

            }
        }
    }]);

}());