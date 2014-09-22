'use strict';

angular.module('mat.app').service('Blog', ['$resource',
  function ($resource) {
    return $resource('/api', {},
      {update: {method: 'PUT'}}
    );
  }
]);