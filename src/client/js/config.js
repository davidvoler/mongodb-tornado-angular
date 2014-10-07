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
      .when('/blog/add', {
        templateUrl: '/static/partials/blog_edit.html',
        controller: 'BlogAddController'
      })
      .when('/blog/:slug', {
        templateUrl: '/static/partials/blog.html',
        controller: 'BlogViewController'
      })
      /*
      .when('/entry:idx:bog_slug', {
        templateUrl: '/static/partials/blog.html',
        controller: 'EntryViewController'
      })
      */
      .when('/add_entry', {
        templateUrl: '/static/partials/entry_edit.html',
        controller: 'EntryAddController'
      })
      .when('/help', {
        templateUrl: '/static/partials/help.html',
        controller: 'HelpController'
      })
  }
]);
