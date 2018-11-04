global.startApp = function(container) {
  console.log("Here is the container:", container);
  // Added qnagular js
  var angular= require("angular");

  var app = angular.module('GameApp', []);
  app.controller('diamondGame', function($scope) {

  });
}



