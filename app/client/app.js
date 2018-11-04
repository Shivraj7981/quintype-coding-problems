global.startApp = function(container) {
  console.log("Here is the container:", container);
  // Added qnagular js
  require("angular");

 // Root module
  var app = angular.module('GameApp', []);

  app.controller('diamondGame', function($scope, $http, $window) {

    function findRange(currentIndex) {
      var rightGreaterNumber;
      var leftSmallerNumber;

      // Finding immidiate greater no than currentIndex
      for (var i = 0; i < $scope.diamonds.length; i++) {
        if ($scope.diamonds[i] > currentIndex) {
            rightGreaterNumber = $scope.diamonds[i];
            break;
        }
      }
      // Finding immidiate Smaller no than currentIndex
      for (var i = $scope.diamonds.length; i >= 0; i--) {
        if ($scope.diamonds[i] < currentIndex) {
            leftSmallerNumber = $scope.diamonds[i];
            break;
        }
      }
      return {
        left: leftSmallerNumber,
        right: rightGreaterNumber
      };
    }

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

    //Checking for the saved status of game if any
    if (localStorage.getItem('gameItemCollection') != "null") {
          $scope.gameItemCollection = JSON.parse(localStorage.getItem('gameItemCollection'));
          $scope.diamonds = JSON.parse(localStorage.getItem('diamonds'))
      } else {
          $scope.gameItemCollection = new Array(64);
      }
    console.log($scope.diamonds)

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