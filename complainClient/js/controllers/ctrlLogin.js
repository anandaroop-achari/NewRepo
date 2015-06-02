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
                if(data.length > 0){
                    if(data[0].admin !== $scope.isAdmin){
                        $scope.errorMessage = "Not an Admin user"
                    }
                else{
            	$window.sessionStorage['isAdmin'] = data.admin;
                $window.sessionStorage['currentUser'] = JSON.stringify(data[0]);
            	$location.path('/v_Home');
                    }
                } else {
                    $scope.errorMessage = "Wrong Username/Password";
                }
            }, function(){

            });

            }
        }
    }]);

}());