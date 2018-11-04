global.startApp = function(container) {
  console.log("Here is the container:", container);
  // Added qnagular js
  require("angular");

 // Root module
  var app = angular.module('GameApp', []);

  app.controller('diamondGame', function($scope, $http, $window) {
    //break line condtion
    $scope.breakLine = function(index) {
        if ((index + 1) % 8 == 1 && index > 0) {
          return true;
        } else {
          return false;
        }
      }
  });

}