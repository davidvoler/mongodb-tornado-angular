'use strict';

angular.module('mat.app')
  .controller('HomeController', ['$scope', 'Blog',
    function ($scope, Blog) {
      $scope.blogs = Blog.query();
    }
  ]
)
  .controller('BlogAddController', ['$scope', '$location', 'Blog',
    function ($scope, $location, Blog) {
      $scope.error = '';
      $scope.blog = {
        name: '',
        description: '',
        tags: ''
      };
      $scope.save = function () {
        //is the new blog valid
        if (!$scope.blog.name) {
          $scope.error = 'Blog name is mandatory';
          return false;
        } else {
          $scope.error = '';
        }
        var blog = new Blog($scope.blog);
        blog.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            //$location.path('/blog/' + response.slug);
            $location.path('/');
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
            $location.path('/blog/' + response.slug);
          } else {
            $scope.error = response.error;
          }
        });
      };
    }
  ]
)
  .controller('BlogViewController', ['$scope', '$route', 'Blog',
    function ($scope, $route, Blog) {
      console.log($route.current.params.slug);
      $scope.error = '';
      $scope.blog = Blog.get({slug: $route.current.params.slug}, function () {
        console.log($scope.blog);
      });
    }
  ]
)

  .controller('EntryViewController', ['$scope', '$route', 'Entry',
    function ($scope, $route, Entry) {
      console.log($route.current.params.slug);
      console.log($route.current.params.idx);
      $scope.error = '';
      $scope.entry = Entry.get({slug: $route.current.params.slug,
        idx: $route.current.params.idx}, function () {
        console.log($scope.entry);
      });
    }
  ]
)

  .controller('EntryAddController', ['$scope', '$route','$location', 'Entry',
    function ($scope, $route,$location, Entry) {
      console.log('EntryAddController');
      $scope.slug = $route.current.params.slug;
      console.log($route.current.params.slug);
      $scope.entry = {
        slug:$scope.slug,
        title: '',
        body: '',
        tags: ''
      };

      $scope.save = function () {
        //is the new entry valid
        if (!$scope.entry.title) {
          $scope.error = 'Entry title is mandatory';
          return false;
        } else if (!$scope.entry.body){
          $scope.error = 'Entry body is mandatory';
          return false;
        }
        else{
          $scope.error = '';
        }
        var entry = new Entry($scope.entry);
        entry.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            //$location.path('/blog/' + response.slug);
            $location.path('/blog/'+$scope.slug);
          } else {
            $scope.error = response.error;
          }
        });
      };
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