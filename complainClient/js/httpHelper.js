(function () {
    'use strict';

    var ngApp = angular.module('ngApp');

    ngApp.factory('httpHelper', ['$http', 'serverLocation',  function ($http, serverLocation) {

    	var httpHelper = {};
    	httpHelper.fnLogin = function (username, password, successCallback, errorCallback) {
    		$http(
                {
                    url: serverLocation + dataPath + 'authentication',
                    method: 'POST',
                    params: {
                        username: username
                    },
                    data: password
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

    	}
    ]);

    }());
