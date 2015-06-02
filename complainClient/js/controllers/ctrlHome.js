(function () {
    'use strict';
 
    var ngApp = angular.module('ngApp');

    ngApp.registerCtrl('ctrlHome', ['$scope', '$location', '$window','$timeout', 'popups', 'httpHelper','moment', function ($scope, $location, $window, $timeout, popups, httpHelper, moment) {
        $scope.strUser = '';
        $scope.errorMessage = "";
        $scope.successMessage = "";
        $scope.ticketList = [];
        $scope.user = JSON.parse($window.sessionStorage['currentUser']);
        $scope.isAdmin= $scope.user.admin;
        $scope.strPwd = $scope.user.password;
        $scope.notifications = [{}];
        $scope.rating = $scope.user.rating;
        $scope.update = false;
        $('#rating').raty();
        $scope.fnNewComplain = function(){

            /*Open popup for new Complain*/
            $scope.newTicket = {
                title : '',
                status : '',
                note : '',
                madeBy: $scope.user.userId,
                email: $scope.user.email,
                assignedTo: ''

            };
            popups.show($scope.newTicket, $scope.createSuccess);
        };
        $scope.fnUpdateUser = function(){
            if($scope.strPwd !== $scope.user.password){
                $scope.errorMessage = "Wrong Password Entered";
            } else {
                var fnScc = function(data){
                    $scope.successMessage = "User Updated Successfully";
                    $window.sessionStorage['currentUser'] = JSON.stringify(data);
                };
                var fnErr = function(err){
                    $scope.errorMessage = "Some Error has occurred";
                }
                $scope.user.rating = $scope.rating;
                httpHelper.fnUpdateUser($scope.user, fnScc, fnErr);
            }

        }
        $scope.fnEditComplain = function(ticket){
            /*Popup for editing existing complain*/
            if(ticket.status !== 'closed'){
            $scope.update = true;
             popups.show(ticket, $scope.createSuccess);
         }
        };
        $scope.fnAssignTicket = function(){
            /*For admin select staff for one ticket*/
        };
        $scope.fnChangeStatus = function(){
            /*For admin to change the status of a ticket*/
        };
        $scope.fnGetTickets = function(){
            var fnScc = function(data){
                console.log(data);
                $window.sessionStorage['currentTickets'] = JSON.stringify(data);
                $scope.ticketList = data;
                if($scope.isAdmin){
                    var fnScc1 = function(data){
                        $scope.staffList = data;
                    };
                    var fnErr1 = function(err){

                    };
                    httpHelper.fnGetStaffs(null, fnScc1, fnErr1);
                }
                //delete $scope.fnGetTickets;
            };
            var fnErr = function(err){

            };
            if($scope.user.admin){
                httpHelper.fnGetTickets('', fnScc, fnErr);
            } else{
                httpHelper.fnGetTickets($scope.user.userId, fnScc, fnErr);
                //$timeout($scope.fnGetTickets, 1000);
            }

        };
        $scope.findDifferences = function(objectA, objectB) {
           var propertyChanges = [];
           var objectGraphPath = ["this"];
           (function(a, b) {
              if(a.constructor == Array) {
                 // BIG assumptions here: That both arrays are same length, that
                 // the members of those arrays are _essentially_ the same, and 
                 // that those array members are in the same order...
                 for(var i = 0; i < a.length; i++) {
                    objectGraphPath.push("[" + i.toString() + "]");
                    arguments.callee(a[i], b[i]);
                    objectGraphPath.pop();
                 }
              } else if(a.constructor == Object || (a.constructor != Number && 
                        a.constructor != String && a.constructor != Date && 
                        a.constructor != RegExp && a.constructor != Function &&
                        a.constructor != Boolean)) {
                 // we can safely assume that the objects have the 
                 // same property lists, else why compare them?
                 for(var property in a) {
                    objectGraphPath.push(("." + property));
                    if(a[property].constructor != Function) {
                       arguments.callee(a[property], b[property]);
                    }
                    objectGraphPath.pop();
                 }
              } else if(a.constructor != Function) { // filter out functions
                 if(a != b) {
                    propertyChanges.push({ "Property": objectGraphPath.join(""), "ObjectA": a, "ObjectB": b });
                 }
              }
           })(objectA, objectB);
           return propertyChanges;
        }
        $scope.createSuccess = function(data){
            if(!$scope.update)
                 $scope.ticketList.push(data);
        };
        $scope.convertDate = function(ms){
            var date = new Date(ms);
            var date1 = moment(date).format("DD/MM/YYYY HH:MM:SS");
            return(date1.toString());       
        };
        $scope.fnDrag = function(dragEl, dropEl){
          var staff = $('#'+ dragEl).data('value');
          var ticket = $('#'+ dropEl).data('value');
          var fnScc = function(data){

          };
          var fnErr = function(err){

          };
          for(var v in $scope.ticketList){
            var tick = $scope.ticketList[v];
            if(tick._id === ticket && tick.status !== 'closed'){
                tick.assignedTo = staff;
                tick.status = 'open';
                break;
            }
          }
          httpHelper.fnUpdateTicket(tick, fnScc, fnErr);
        };
    }]);

}());