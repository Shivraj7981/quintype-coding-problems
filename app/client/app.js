global.startApp = function(container) {
  console.log("Here is the container:", container);
  // Added qnagular js
  require("angular");

 // Root module
  var app = angular.module('GameApp', []);

  app.controller('diamondGame', function($scope, $http, $window) {



    $scope.isVisited = "";

    $scope.isBoxDiamond = function(event, index) {
      // When no diamonds left showing the score to user;
      if ($scope.diamonds.length == 0) {
          $scope.userScore = document.getElementsByClassName("question").length;
          $scope.isGameComplete = true;
          return false;
      }
      $scope.isGameComplete = false;
    // Game is on remove question mark
      event.currentTarget.classList.remove("question");
      // Found a diamond
      if ($scope.diamonds.indexOf(index + 1) != -1) {
            event.currentTarget.classList.add("diamond");
            $scope.gameItemCollection[index] = 1;
      if ($scope.isVisited) {
            $scope.isVisited.classList.remove("arrow")
            $scope.isVisited.classList.remove("left-arrow")
      }
      $scope.isVisited = null;
      $scope.diamonds.splice($scope.diamonds.indexOf(index + 1), 1);

    } else {
      // Its not a diamond
      $scope.range = findRange(index + 1);

      if (!$scope.range.left) {
          event.currentTarget.classList.add("arrow")
          $scope.gameItemCollection[index] = 2;
        if ($scope.isVisited) {
          $scope.isVisited.classList.remove("arrow")
          $scope.isVisited.classList.remove("left-arrow")
      }

      $scope.isVisited = event.currentTarget;
      return;
      }
      else if (!$scope.range.right) {
        event.currentTarget.classList.add("left-arrow");
        $scope.gameItemCollection[index] = 2;

        if ($scope.isVisited) {
          $scope.isVisited.classList.remove("left-arrow")
          $scope.isVisited.classList.remove("arrow")
        }
        $scope.isVisited = event.currentTarget;
        return;
    }

    var min = Math.min((index + 1) - $scope.range.left, $scope.range.right - (index + 1));

    if ((index + 1) - $scope.range.left == min) {
          event.currentTarget.classList.add("left-arrow");
          $scope.gameItemCollection[index] = 2;

          if ($scope.isVisited) {
            $scope.isVisited.classList.remove("left-arrow")
            $scope.isVisited.classList.remove("arrow")
          }
          $scope.isVisited = event.currentTarget;
          return "goLeft";
    } else {
          event.currentTarget.classList.add("arrow")
          $scope.gameItemCollection[index] = 2;
          if ($scope.isVisited) {
            $scope.isVisited.classList.remove("arrow")
            $scope.isVisited.classList.remove("left-arrow")
          }
          $scope.isVisited = event.currentTarget;
          return "goRight";
    }
  }
}

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