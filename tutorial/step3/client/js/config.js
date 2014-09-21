'use strict';
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
