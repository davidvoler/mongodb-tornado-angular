'use strict';

angular.module('mat.app')
  .controller('HomeController', ['$scope', 'Blog',
    function ($scope, Blog) {
      $scope.blogs = Blog.query();
    }
  ]
)
  .controller('BlogAddController', ['$scope', '$location', 'Blog',
    function ($scope, Blog) {
      $scope.error = '';
      $scope.blog = {
        name: '',
        description: '',
        tags: ''
      };
      $scope.save = function () {
        //is the new blog valid
        if (!$scope.blog.name){
          $scope.error = 'Blog name is mandatory';
          return false;
        }else{
          $scope.error = '';
        }
        var blog = new Blog($scope.blog);
        blog.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path('/blog/' + response.slug);
          } else {
            $scope.error = response.error;
          }
        });
      };
    }
  ]
)
  .controller('BlogEditController', ['$scope', '$location', 'Blog',
    function ($scope, Blog) {
      $scope.error = '';
      $scope.blog = Blog.get({_id: $route.current.params.slug});
      $scope.save = function () {
        $scope.blog.$update(function (response) {
          if (response.status == 0) {
            $location.path('/blog/'+response.slug);
          } else {
            $scope.error = response.error;
          }
        });
      };
    }
  ]
)

  .controller('BlogEditController', ['$scope', 'Blog',
    function ($scope, Blog) {
      $scope.createBlog = function () {

      }
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