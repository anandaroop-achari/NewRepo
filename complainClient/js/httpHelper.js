(function () {
    'use strict';

    var ngApp = angular.module('ngApp');

    ngApp.factory('httpHelper', ['$http', 'serverLocation',  function ($http, serverLocation) {

    	var httpHelper = {};
    	httpHelper.fnLogin = function (username, password, isAdmin, successCallback, errorCallback) {
    		$http(
                {
                    url: 'http://localhost:3000/users/authentication/',
                    method: 'POST',
                    data: {
                        username: username,
                        password: password, 
                        isAdmin: isAdmin
                    }
                }
            ).
                success(function (data, status, headers) {
                    if (successCallback) {
                        successCallback(data);
                    }
                }).error(function (data, status, headers, config) {
                    if (errorCallback) {
                        errorCallback(data, status, headers, config);
                    }
                });
    	};
        httpHelper.fnGetTickets = function(user, successCallback, errorCallback){
            var params = null;
            if(user !== ''){
                params = {
                    userId : user
                }
            }
            $http(
                {
                    url: 'http://localhost:3000/complains/',
                    method: 'GET',
                    params: params
                }
            ).
                success(function (data, status, headers) {
                    if (successCallback) {
                        successCallback(data);
                    }
                }).error(function (data, status, headers, config) {
                    if (errorCallback) {
                        errorCallback(data, status, headers, config);
                    }
                });
        };
         httpHelper.fnCreateTicket = function(data, successCallback, errorCallback){
            $http(
                {
                    url: 'http://localhost:3000/complains/',
                    method: 'POST',
                    data: data
                }
            ).
                success(function (data, status, headers) {
                    if (successCallback) {
                        successCallback(data);
                    }
                }).error(function (data, status, headers, config) {
                    if (errorCallback) {
                        errorCallback(data, status, headers, config);
                    }
                });
        };
        httpHelper.fnUpdateTicket = function(data, successCallback, errorCallback){
            $http(
                {
                    url: 'http://localhost:3000/complains/update',
                    method: 'POST',
                    data: data
                }
            ).
                success(function (data, status, headers) {
                    if (successCallback) {
                        successCallback(data);
                    }
                }).error(function (data, status, headers, config) {
                    if (errorCallback) {
                        errorCallback(data, status, headers, config);
                    }
                });
        };
        httpHelper.fnGetStaffs = function(param, successCallback, errorCallback){
             $http(
                {
                    url: 'http://localhost:3000/users/getStaff',
                    method: 'GET',
                    params: null
                }
            ).
                success(function (data, status, headers) {
                    if (successCallback) {
                        successCallback(data);
                    }
                }).error(function (data, status, headers, config) {
                    if (errorCallback) {
                        errorCallback(data, status, headers, config);
                    }
                });
        };
        httpHelper.fnUpdateUser = function(data, successCallback, errorCallback){

            $http(
                {
                    url: 'http://localhost:3000/users/update/',
                    method: 'POST',
                    data: data
                }
            ).
                success(function (data, status, headers) {
                    if (successCallback) {
                        successCallback(data);
                    }
                }).error(function (data, status, headers, config) {
                    if (errorCallback) {
                        errorCallback(data, status, headers, config);
                    }
                });
        }

            return httpHelper;
    	}
    ]);

    }());
