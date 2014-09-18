'use strict';

angular.module('ate.monitor')

  .controller('StationListController', ['$scope', '$routeParams', '$location', '$http',
    function ($scope, $routeParams, $location, $timeout, $http, ProductionService) {
      $scope.controllerName = 'StationListController';
    }
  ]
)
  .controller('LoginController', ['$cookieStore', '$scope', '$rootScope', '$http', '$location',
    function ($cookieStore, $scope, $rootScope, $http, $location) {
      $scope.username = '';
      $scope.password = '';
      $scope.error = '';
      $scope.login = function () {
        var data = {username: $scope.username, password: $scope.password};
        $http.post('/login', data).success(function (data, status, headers, config) {
          // this callback will be called asynchronously
          //console.log(data);
          if (data.status == 0) {
            $rootScope.userProfile = angular.copy(data.user);
            $cookieStore.put('ate_user_prof', data.user);
            console.log($cookieStore.get('ate_user_prof'));
            $scope.error = '';
            console.log('login success');
            //console.log(document.cookie);
            $location.path('/');
          } else {
            $scope.error = data.error;
            $scope.username = '';
            $scope.password = '';
            console.log('login fail');
          }

        }).error(function (data, status, headers, config) {
          $scope.error = data;
        });
      };
      $scope.logout = function () {
        var data = {};
        console.log($cookieStore.get('ate_user_prof'));
        $http.put('/login', data).success(function (data, status, headers, config) {
          // this callback will be called asynchronously
          console.log(data);
          if (data.status == 0) {
            //delete $rootScope.userProfile;
            $cookieStore.remove('ate_user_prof');
            console.log($cookieStore.get('ate_user_prof'));
            $location.path('/login');
            //console.log(document.cookie);
          }

        }).error(function (data, status, headers, config) {
          $scope.error = data;
        });
      };

      $scope.isAdmin = function () {
        var user = $cookieStore.get('ate_user_prof');
        //console.log(user);
        if (!user) {
          return false;
        } else if (!user.admin) {
          return false;
        } else {
          return true;
        }

      };
      $scope.isTechSupport = function () {
        var user = $cookieStore.get('ate_user_prof');
        //console.log(user);
        if (!user) {
          return false;
        } else if (!user.tech_support) {
          return false;
        } else {
          return true;
        }

      };
      $scope.isLoggedIn = function () {
        var user = $cookieStore.get('ate_user_prof');
        //console.log(user);
        if (!user) {
          return false;
        } else {
          return true;
        }
      };

    }
  ]
)


  .controller('StationController', ['$cookies', '$rootScope', '$scope', '$resource', '$http', '$location', 'Station', 'Monitor',
    function ($cookies, $rootScope, $scope, $resource, $http, $location, Station, Monitor) {
      $scope.controllerName = 'StationController';
      $scope.domain = window.location.host;
      $scope.domain1 = $location.host();
      $scope.error = '';
      $scope.station = false;
      $scope.monitor = Monitor;
      $scope.userProfile = $rootScope.userProfile;
      $scope.user_cookie = $cookies.ate_monitor_user;

      console.log($cookies.ate_monitor_user);
      console.log($cookies);

      $scope.getStation = function () {
        Station.get({station_id: $location.host()},
          function (response) {
            if (response.status == 0) {
              $scope.station = response.station;
            } else {
              $scope.error = response.error;
            }
          }
        )
      }
      $scope.getStation();
      $scope.runTse = function (tf_id) {
        var data = {tf_id: tf_id};
        $http.put('/station', data).
          success(function (data, status) {
            console.log(data);

          }).
          error(function (data, status) {
            console.log("Request failed");
            console.log(data);
          });
      };
      $scope.getCavityStatus = function () {
        return Math.floor((Math.random() * 10) + 1);
      };
    }
  ]
)

  .controller('MonitoringController', ['$scope', '$http', '$sce' , 'Monitor',
    function ($scope, $http, $sce, Monitor) {
      $scope.controllerName = 'MonitoringController';
      //$scope.tfList = Monitor.getTfList();
      $scope.monitor = Monitor;
      $scope.activeTf = Monitor.activeTf;

      $scope.setActiveIdx = function (idx) {
        Monitor.setActiveIdx(idx);
      };

      $scope.updateTfs = function () {
        console.log('something ');
        $http({method: 'GET', url: '/tf'}).
          success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            console.log(data);
            $scope.tf_list = data.list;
          }).
          error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

      };
      $scope.bbbCommand = function (tf, command, params) {
        return Monitor.bbbCommand(tf, command, params)
      };
      $scope.terminalTrustedHtml = function () {
        return $sce.trustAsHtml($scope.activeTf.commandResult);
      };

      $scope.checkKey = function (event) {
        if (event.which === 13) {
          console.log($scope.monitor.tfList[$scope.monitor.activeIdx].cli);
          $scope.bbbCommand($scope.monitor.tfList[$scope.monitor.activeIdx],
            $scope.monitor.tfList[$scope.monitor.activeIdx].cli, '');
          $scope.monitor.tfList[$scope.monitor.activeIdx].cli = '';

        }
      };


    }
  ]
)

  .controller('AdminController', ['$scope', '$routeParams', '$location', '$http',
    function ($scope, $routeParams, $location, $timeout, $http, ProductionService) {
      $scope.controllerName = 'AdminController';
    }
  ]
)

  .controller('AdminUsersController', ['$scope', '$resource', 'User',
    function ($scope, $resource, User) {
      $scope.newUser = {username: '', admin: false, tech_support: false, dev: false};
      //var User = $resource('/users/admin');
      $scope.users = User.query();

      $scope.addUser = function () {
        var user = new User($scope.newUser);
        user.$save(function (response) {
          console.log(response);
          $scope.users = User.query();
        });
        $scope.newUser = {username: '', admin: false, tech_support: false, dev: false};
      };
      $scope.update = function (usr) {
        console.log(usr);
        console.log(usr.username);
        usr.$update({username: usr.username}, function () {
          $scope.users = User.query();
        });
      };
      $scope.remove = function (usr) {
        console.log(usr);
        console.log(usr.username);
        usr.$remove({username: usr.username}, function () {
          $scope.users = User.query();
        });
      };


    }]
)

  .controller('AdminStationsController', ['$scope', '$resource', '$http', 'StationAdmin',
    function ($scope, $resource, $http, StationAdmin) {

      $scope.loadTags = function (query) {
        return $http.get('/station/admin?tf_query=' + query);
      };
      $scope.loadTfs = function (query) {
        $http.get('/station/admin?tf_query=' + query)
          .success(function (data, status, headers, config) {
            $scope.tfs = data;
          }).
          error(function (data, status, headers, config) {
            console.log(data);
          });
      };
      $scope.tfs = [];
      $scope.loadTfs(1);
      $scope.addTf = function (station, tf) {
        if (station.tfs.indexOf(tf.ip_address) < 0) {
          station.tfs.push(tf);
        }
      };
      $scope.removeTf = function (station, idx) {
        station.tfs.splice(idx, 1);
      };
      $scope.newStationTmpl = {name: '', _id: '', tfs: []};
      $scope.newStation = angular.copy($scope.newStationTmpl);
      $scope.editIdx = -1;
      $scope.stations = StationAdmin.query();
      $scope.create = function () {
        console.log('creating a station');
        var station = new StationAdmin($scope.newStation);
        station.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $scope.editIdx = -1;
            $scope.stations = StationAdmin.query();
          } else {
            $scope.editIdx = -1;
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
          $scope.stations = StationAdmin.query();
          $scope.newStation = angular.copy($scope.newStationTmpl);
        });
      };
      $scope.remove = function (station) {
        console.log(station);
        console.log(station._id);
        station.$remove({_id: station._id}, function () {
          $scope.stations = StationAdmin.query();
        });
      };
      $scope.edit = function (idx) {
        $scope.editIdx = idx;
      };
      $scope.cancel = function (idx) {
        $scope.editIdx = -1;
        $scope.stations = StationAdmin.query();
      };
      $scope.save = function (station) {
        station.id = station._id.$oid;
        console.log(station);
        station.$update(function (response) {
          if (response.status == 0) {
            $scope.editIdx = -1;
            $scope.stations = StationAdmin.query();
          } else {
            $scope.editIdx = -1;
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        }, function (response) {
          console.log(response)
        });
      };
    }])

  .controller('AdminTestFixturesController1', ['$scope', '$resource', 'TestFixtureAdmin',
    function ($scope, $resource, TestFixtureAdmin) {

      $scope.newTfTepl = {name: '', ip: ''};
      $scope.newTf = $scope.newTfTepl;
      $scope.tfs = TestFixtureAdmin.query();

      $scope.add = function () {
        var tf = new TestFixtureAdmin($scope.newTf);
        tf.$save(function (response) {
          console.log(response);
          $scope.users = TestFixtureAdmin.query();
          $scope.newTf = $scope.newTfTepl;
        });
      };
      $scope.update = function (tf) {
        console.log(tf);
        console.log(tf.ip_address);
        usr.$update({ip_address: tf.ip_address}, function () {
          $scope.tfs = TestFixtureAdmin.query();
        });
      };
      $scope.remove = function (tf) {
        console.log(tf);
        console.log(tf.ip_address);
        tf.$remove({ip_address: tf.ip_address}, function () {
          $scope.tfs = TestFixtureAdmin.query();
        });
      };

    }])
  .controller('AdminTestFixturesAddController1', ['$scope', '$resource', '$location', '$route', 'TestFixtureAdmin',
    function ($scope, $resource, $location, $route, TestFixtureAdmin) {
      var cavityTmpl = {x: 1, y: 1, active: true};
      var attrTmpl = {name: '', info: '', icon: '', commands: []};
      var commandTmpl = {name: '', command: '', params: ''};
      $scope.os = ['linux', 'windows'];
      $scope.icons = ["fa-glass", "fa-music", "fa-search", "fa-envelope-o", "fa-heart", "fa-star", "fa-star-o", "fa-user", "fa-film", "fa-th-large", "fa-th", "fa-th-list", "fa-check", "fa-times", "fa-search-plus", "fa-search-minus", "fa-power-off", "fa-signal", "fa-cog", "fa-trash-o", "fa-home", "fa-file-o", "fa-clock-o", "fa-road", "fa-download", "fa-arrow-circle-o-down", "fa-arrow-circle-o-up", "fa-inbox", "fa-play-circle-o", "fa-repeat", "fa-refresh", "fa-list-alt", "fa-lock", "fa-flag", "fa-headphones", "fa-volume-off", "fa-volume-down", "fa-volume-up", "fa-qrcode", "fa-barcode", "fa-tag", "fa-tags", "fa-book", "fa-bookmark", "fa-print", "fa-camera", "fa-font", "fa-bold", "fa-italic", "fa-text-height", "fa-text-width", "fa-align-left", "fa-align-center", "fa-align-right", "fa-align-justify", "fa-list", "fa-outdent", "fa-indent", "fa-video-camera", "fa-picture-o", "fa-pencil", "fa-map-marker", "fa-adjust", "fa-tint", "fa-pencil-square-o", "fa-share-square-o", "fa-check-square-o", "fa-arrows", "fa-step-backward", "fa-fast-backward", "fa-backward", "fa-play", "fa-pause", "fa-stop", "fa-forward", "fa-fast-forward", "fa-step-forward", "fa-eject", "fa-chevron-left", "fa-chevron-right", "fa-plus-circle", "fa-minus-circle", "fa-times-circle", "fa-check-circle", "fa-question-circle", "fa-info-circle", "fa-crosshairs", "fa-times-circle-o", "fa-check-circle-o", "fa-ban", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrow-down", "fa-share", "fa-expand", "fa-compress", "fa-plus", "fa-minus", "fa-asterisk", "fa-exclamation-circle", "fa-gift", "fa-leaf", "fa-fire", "fa-eye", "fa-eye-slash", "fa-exclamation-triangle", "fa-plane", "fa-calendar", "fa-random", "fa-comment", "fa-magnet", "fa-chevron-up", "fa-chevron-down", "fa-retweet", "fa-shopping-cart", "fa-folder", "fa-folder-open"];
      $scope.error = '';
      $scope.isNew = false;
      $scope.tfTmpl = {
        name: '', ip_address: '', device: '', os: 'linux', cavities_x: 4, cavities_y: 1, enableCmd: true, cli: '',
        cavities: [],
        attrs: [
          {name: 'OS', info: 'Operating System', icon: 'fa-cog', commands: [
            {name: 'restart', command: 'restart', params: 'now'},
            {name: 'update software', command: 'apt-get', params: 'update'},
            {name: 'upgrade software', command: 'apt-get', params: 'upgrade'}
          ]
          },
          {name: 'SVN', info: 'Source Control', icon: 'fa-history', commands: [
            {name: 'update', command: 'cd /usr/CROW/ATE && svn cleanup && svn update', params: ''},
            {name: 'cleanup', command: 'cd /usr/CROW/ATE && svn cleanup ', params: ''},
            {name: 'info', command: 'cd /usr/CROW/ATE && svn info', params: ''}
          ]
          },
          {name: 'Supervisor', info: 'Program Watchdog', icon: 'fa-tachometer', commands: [
            {name: 'restart', command: 'service supervisor stop && service supervisor start', params: ''},
            {name: 'stop', command: 'service supervisor stop', params: ''},
            {name: 'start', command: 'service supervisor start', params: ''}
          ]
          }
        ]
      };

      $scope.range = function (cnt) {
        var arr = [];
        for (var i = 0; i < cnt; i++) {
          arr.push(i);
        }
        return arr;
      };
      $scope.setCavities = function () {
        $scope.tf.cavities = [];
        for (var i = 0; i < $scope.tf.cavities_y; i++) {
          //if (!$scope.tf.cavities[i]){
          $scope.tf.cavities.push([]);
          //}
          $scope.tf.cavities[i] = [];
          for (var j = 0; j < $scope.tf.cavities_x; j++) {
            //if(!$scope.tf.cavities[i][j]){
            $scope.tf.cavities[i].push({y: i, x: j, active: true});
            //}
          }
        }
        console.log($scope.tf);
      };
      $scope.save = function () {
        //$scope.setCavities();
        if ($scope.isNew) {
          var tf = new TestFixtureAdmin($scope.tf);
          tf.$save(function (response) {
            console.log(response);
            if (response.status == 0) {
              $location.path('admin/test_fixtures');
            } else {
              $scope.error = response.error;
              $scope.debug = response.debug;
            }
          });
        } else {
          console.log($scope.tf._id);
          $scope.tf.id = $scope.tf._id.$oid;
          console.log($scope.tf);
          $scope.tf.$update(function (response) {
            if (response.status == 0) {
              $location.path('admin/test_fixtures');
            } else {
              $scope.error = response.error;
              $scope.debug = response.debug;
            }
          });
        }
      };
      $scope.addAttr = function () {
        $scope.tf.attrs.push(angular.copy(attrTmpl));
      };
      $scope.addCommand = function (idx) {
        $scope.tf.attrs[idx].commands.push(angular.copy(commandTmpl));
      };
      $scope.initTf = function () {
        window.route = $route;
        console.log($route);
        if ($route.current.params.testFixtureId) {
          console.log($route.current.params.testFixtureId);
          var tf = TestFixtureAdmin.get({ip_address: $route.current.params.testFixtureId},
            function (response) {
              console.log(response);
              $scope.isNew = false;
              $scope.tf = response;
            })
        } else {
          $scope.isNew = true;
          $scope.tf = angular.copy($scope.tfTmpl);
          $scope.setCavities();
        }

      };
      $scope.initTf();
      //$scope.setCavities();
      //$scope.addAttr();
      //$scope.addCommand(0);
    }])


  .controller('AdminTseListController', ['$scope', '$resource', '$http', '$location', 'TseConf',
    function ($scope, $resource, $http, $location, TseConf) {

      $scope.tseConfigs = TseConf.query();

    }])

  .controller('AdminTseEditController', ['$scope', '$resource', '$http', '$location', 'TseConf',
    function ($scope, $resource, $http, $location, TseConf) {

      $scope.testProfileLine = {name: '', type: 'multi', timeout: 0.1};
      $scope.testProfileType = ['multi', 'queue'];
      $scope.tse = {
        tse: {
          agent: '',
          test_set_file: '',
          timeout: 5
        },

        runtime_info: {
          test_profile: [
            {name: test_example1, type: multi},
            {name: test_example2, type: queue, timeout: 0.1},
            {name: test_example3, type: multi},
            {name: test_example4, type: multi},
            {name: test_example5, type: multi}
          ],
          ts: '',
          test_fixture: '',
          batch: '',
          eco: '',
          location: '',
          customer: ''
        },
        working: {
          dut_model: '',
          hw_version: '',
          fw_stm_version: 0,
          fw_stm_file: ''
        }
      }


    }]);
