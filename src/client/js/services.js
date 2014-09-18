'use strict';

angular.module('ate.monitor').service('Blog', ['$resource',
  function ($resource) {
    return $resource('/api', {},
      {update: {method: 'PUT'}}
    );
  }
]);