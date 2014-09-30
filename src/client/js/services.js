'use strict';

angular.module('mat.app')
.service('Blog', ['$resource',
  function ($resource) {
    return $resource('/api/blog', {},
      {update: {method: 'PUT'}}
    );
  }
])
.service('Entry', ['$resource',
  function ($resource) {
    return $resource('/api/entry', {},
      {update: {method: 'PUT'}}
    );
  }
]);
