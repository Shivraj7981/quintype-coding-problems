global.startApp = function(container) {
  console.log("Here is the container:", container);
  // Added qnagular js
  require("angular");

 // Root module
  var app = angular.module('GameApp', []);

  app.controller('diamondGame', function($scope, $http, $window) {

    // getting array of random diamond numbers. in the range of 1 to 64
    $scope.getRandomDiomondsNumber = function() {
      var count = 8;
      var diamond = [];
      var min = 1;
      var max = 64;
      while (count > 0) {
        if (diamond.indexOf(parseInt(Math.random() * (+max - +min) + +min)) == -1) {
            diamond.push(parseInt(Math.random() * (+max - +min) + +min));
            count--;
          }
      }
      return diamond.sort(function(a, b) {
        return a - b
      });
    }

    // getting array of random diamond numbers.
    $scope.diamonds = $scope.getRandomDiomondsNumber();



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