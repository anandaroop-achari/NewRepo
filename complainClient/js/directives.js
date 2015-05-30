(function () {
    'use strict';

    var ngApp = angular.module('ngApp');
	var vFlagIgnore = false;

    ngApp.directive('loginheader', function (serverLocation, resourcesPath) {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                goBack: '@',
                showMenu: '=',
                
            },
            templateUrl: serverLocation + resourcesPath + 'partials/vLoginHeader.html',
            controller: function ($scope, $log, $location) {
                $scope.fnLogout = function () {
                    $location.path('/v_logout');
                }
            }
        };
    });
    
    ngApp.directive('homeTab', function (serverLocation, resourcesPath) {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                icon: '@',
                link: '@'
            },
            templateUrl: serverLocation + resourcesPath + 'partials/vHomeTab.html',
            controller: function ($scope, $location) {
                $scope.fnNavigate = function () {                	
                    $location.path($scope.link);
                }
            }
        };
    });
	
    ngApp.directive('ufisdate', function () {
        return {
            require: "ngModel",
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (data) {
                	
                    // Converts a date into yyyyMMddHHmmss00
                	return moment(data).format('YYYYMMDDHHmmss00');
                	
                });

                modelCtrl.$formatters.push(function (data) {
                    // Converts yyyyMMddHHmmss00 to date
                	
                    if (data) {
                        var result = moment.utc(data, 'YYYYMMDDHHmmss00');
                    } else {
                        result = null;
                    }
                    return result.toDate();
                	
                });
            }
        };
    });	
	
	ngApp.directive('flightTimingCtrl', function(){
		return {
			restrict: 'E',
			template: '<input ng-model="inputValue" style="width:80px" ng-blur="fnBlur(this)" class="form-control input-sm" /><input ng-hide="true" style="width:0px" type="text" value="{{flightDate}}" />',
			scope: {
				inputValue: '=',
				flightDate: '@',
				saveValue: '&'  
			},
			controller:function($scope){
                $scope.save = function(v){                    
                    $scope.saveValue({'val' : v});
                };
            },
			link: function (scope) {
				scope.fnBlur = function(e){
					console.log("Blur");
					var strIn = e.inputValue;
					var vTmpVal = "";
					if(strIn!==null && strIn!==undefined && strIn.length>0){
						if(strIn.length>6)
							vTmpVal = moment(scope.flightDate.substring(0, 8) + strIn.substring(0,4) + scope.flightDate.substring(12, 14), "YYYYMMDDHHmmss").add(strIn.substring(5,7)*1, 'day').format("YYYY-MM-DD HH:mm:ss");
						else
							vTmpVal = moment(scope.flightDate.substring(0, 8) + strIn.substring(0,4) + scope.flightDate.substring(12, 14), "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"); 
					}
					
					scope.save(vTmpVal);
				};
				
				scope.$watch('inputValue', function(newValue, oldValue) {
					if((newValue===oldValue)||((oldValue===undefined||oldValue===null||oldValue.trim().length===0)&&
						(newValue===undefined||newValue===null||newValue.trim().length===0))){
					}else{	
						console.log("inputValue watcher");
						if(newValue===undefined||newValue===null||newValue.trim().length==0){
						}else{
							var strIn = newValue.trim();
							var vLen = strIn.length;
							if(vLen<=4){      
								var vRx = /[0-9]/g;
								var vM = strIn.match(vRx);
								if(vM == null || vM.length<strIn.length)
									scope.inputValue = oldValue;
								else{
									if(vLen<4)
										strIn = strIn + Array(5-vLen).join('0');
													   
									if((strIn.substring(0,2)*1)>23)
										scope.inputValue = oldValue;
									else if((strIn.substring(2,4)*1)>59)
										scope.inputValue = oldValue;
								}
							} else if(vLen===5){
								if(strIn.substring(4,5)!=="/")
									scope.inputValue = oldValue;
							} else if(vLen===6){
								if(strIn.substring(5,6)!=="+" && strIn.substring(5,6)!=="-")
									scope.inputValue = oldValue;
							} else if(vLen===7){
								var vRx = /[0-9]/g;
								var vM = strIn.substring(6,7).match(vRx);
								if(vM == null)
									scope.inputValue = oldValue;
							} else {
								scope.inputValue = oldValue;
							}					
						}
					}
				});
			}
		};
	});
    
    ngApp.filter("ufisdate", function () {
        return function (data) {        	
			var result;
			if (data) {
				result = moment.utc(data, 'YYYYMMDDHHmmss00');
			} else {
				result = null;
			}
			
			if(result !== null && result !== undefined)
				return result.toDate();        
			
			return null;
        };
    });

    ngApp.factory('authenticationInterceptor', ['$q', '$location', '$injector',
        function ($q, $location, $injector) {
            var authenticationInterceptor = {
                'responseError': function (rejection) {
                    if (rejection.status === 403 || rejection.status === 401) {
                        /*
						
						*/
                    } else {
                        if (rejection.data && rejection.data.message) {
                           alert("Could not complete operation");
                        } else {
                           alert("Server error");
                        }
                    }
                    return $q.reject(rejection);
                }
            };

            return authenticationInterceptor;
        }
    ]);

    ngApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptor');
    });

}());