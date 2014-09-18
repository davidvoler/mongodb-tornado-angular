'use strict';

angular.module('mat.app').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/partials/home.html',
        controller: 'HomeController'
      })
      .when('/about', {
        templateUrl: '/static/partials/about.html',
        controller: 'AboutController'
      })
    .when('/help', {
        templateUrl: '/static/partials/help.html',
        controller: 'HelpController'
      })
  }
]);
