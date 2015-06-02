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
   ngApp.directive('lvlDropTarget', ['$rootScope', 'uuid', function($rootScope, uuid) {
        return {
            restrict: 'A',
            scope: {
                onDrop: '&'
            },
            link: function(scope, el, attrs, controller) {
                var id = angular.element(el).attr("id");
                if (!id) {
                    id = uuid.new()
                    angular.element(el).attr("id", id);
                }
                            
                el.bind("dragover", function(e) {
                    if (e.preventDefault) {
                      e.preventDefault(); // Necessary. Allows us to drop.
                  }
                   
                  if(e.stopPropagation) { 
                    e.stopPropagation(); 
                  }
 
                  e.dataTransfer.dropEffect = 'move';
                  return false;
                });
                 
                el.bind("dragenter", function(e) {
                  angular.element(e.target).addClass('lvl-over');
                });
                 
                el.bind("dragleave", function(e) {
                  angular.element(e.target).removeClass('lvl-over');  // this / e.target is previous target element.
                });
 
                el.bind("drop", function(e) {
                  if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                  }
 
                  if (e.stopPropogation) {
                    e.stopPropogation(); // Necessary. Allows us to drop.
                  }
 
                  var data = e.dataTransfer.getData("text");
                  var dest = document.getElementById(id);
                  var src = document.getElementById(data);
                  scope.onDrop({dragEl: src.id, dropEl: dest.id});
                });
 
                $rootScope.$on("LVL-DRAG-START", function() {
                  var el = document.getElementById(id);
                  angular.element(el).addClass("lvl-target");
                });
                 
                $rootScope.$on("LVL-DRAG-END", function() {
                  var el = document.getElementById(id);
                  angular.element(el).removeClass("lvl-target");
                  angular.element(el).removeClass("lvl-over");
                });
            }
        }
    }]);
   ngApp.directive('lvlDraggable', ['$rootScope', 'uuid', function($rootScope, uuid) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs, controller) {
                angular.element(el).attr("draggable", "true");
 
                var id = angular.element(el).attr("id");
                if (!id) {
                    id = uuid.new()
                    angular.element(el).attr("id", id);
                }
                 
                el.bind("dragstart", function(e) {
                    e.dataTransfer.setData('text', id);
                    $rootScope.$emit("LVL-DRAG-START");
                });
                 
                el.bind("dragend", function(e) {
                    $rootScope.$emit("LVL-DRAG-END");
                });
            }
        }
    }]);
   ngApp.directive("raty", function() {
    return {
        restrict: 'AE',
        link: function(scope, elem, attrs) {
            //scope.score = attrs.score;
            $(elem).raty({score: attrs.ngModel, 
                            number: attrs.number,
                            click: function(score, event) {
                //Set the model value
                scope.$parent[attrs.ngModel] = score;

                //Apply the changes so that the controller and any $watch on the model will be notified
                scope.$apply();
            }
            });
        }
    }
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