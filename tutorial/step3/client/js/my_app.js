'use strict';
/*
application module for mongo-tornado-angular
 */
angular.module('mat.app', [ 'ngRoute']);

/*
Here we define the routing of partial html

 */
angular.module('mat.app').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/partials/home.html',
        controller: 'HomeController'
      })
  }
]);

/*
  the controller for home page

 */

angular.module('mat.app')
  .controller('HomeController', ['$scope',
    function ($scope) {
      $scope.step = 'Step 3';
      $scope.welcomeText = 'Welcome to mongodb-tornado-angular tutorial';
    }
  ]
);