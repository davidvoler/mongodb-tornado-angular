'use strict';

angular.module('mat.app')
  .controller('HomeController', ['$scope',
    function ($scope) {
      $scope.controllerName = 'HomeController';
    }
  ]
)
  .controller('HelpController', ['$scope',
    function ($scope) {
      $scope.controllerName = 'HelpController';
    }
  ]
)
 .controller('AboutController', ['$scope',
    function ($scope) {
      $scope.controllerName = 'AboutController';
    }
  ]
);