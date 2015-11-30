'use strict';
var app = angular.module('contactList', []);

app.controller('appCtrl', ['$scope','$http', function($scope, $http) {
  
  var refresh = function() {
  $http.get('/contactlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";
    });
  };

  refresh();

  $scope.addContact = function() {
    var newContact = $scope.contact;
    $http.post('/contactlist', newContact)
    .success(function(response) {
      console.log('postdata',response);
      refresh();
    });
  };

  $scope.deleteContact = function(id) {
    $http.delete('/contactlist/' + id)
    .success(function(response) {
      refresh();
    });
  };

  $scope.editContact = function(id) {
    $http.get('/contactlist/' + id)
    .success(function(response) {
      $scope.contact = response;
    });
  };

  $scope.update = function() {
    var id = $scope.contact._id;
    $http.put('/contactlist/' + id, $scope.contact)
    .success(function() {
      refresh();
    });
  };

}]);




