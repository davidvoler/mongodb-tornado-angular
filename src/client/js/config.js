'use strict';

angular.module('ate.monitor').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: '/client/partials/admin.html',
        controller: 'AdminController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/stations', {
        templateUrl: '/static/partials/admin/admin_stations.html',
        controller: 'AdminStationController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/stations/add', {
        templateUrl: '/static/partials/admin/admin_stations_edit.html',
        controller: 'AdminStationAddController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/stations/edit:stationId', {
        templateUrl: '/static/partials/admin/admin_stations_edit.html',
        controller: 'AdminStationEditController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/product_config', {
        templateUrl: '/static/partials/admin_product_config.html',
        controller: 'AdminProductConfigController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/product_config/edit/:productConfigId', {
        templateUrl: '/static/partials/admin_product_config_edit.html',
        controller: 'AdminTestFixturesEditController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/product_config/add', {
        templateUrl: '/static/partials/admin_product_config_edit.html',
        controller: 'AdminProductConfigAddController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/batch_numbers', {
        templateUrl: '/static/partials/admin/admin_batch_numbers.html',
        controller: 'AdminBatchNumberController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/test_fixtures', {
        templateUrl: '/static/partials/admin/admin_test_fixtures.html',
        controller: 'AdminTestFixturesController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/test_fixtures/add', {
        templateUrl: '/static/partials/admin/admin_test_fixtures_edit.html',
        controller: 'AdminTestFixtureAddController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/test_fixtures/edit/:testFixtureId', {
        templateUrl: '/static/partials/admin/admin_test_fixtures_edit.html',
        controller: 'AdminTestFixtureEditController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/admin/users', {
        templateUrl: '/static/partials/admin_users.html',
        controller: 'AdminUsersController',
        resolve: {
                    factory: checkAdmin
                }
      })
      .when('/monitoring', {
        templateUrl: '/static/partials/monitoring.html',
        controller: 'MonitoringController',
        resolve: {
                    factory: checkTechSupport
                }
      })
      .when('/station/:stationId', {
        templateUrl: '/static/partials/station.html',
        controller: 'StationController',
        resolve: {
                    factory: checkTechSupport
                }
      })
      .when('/monitor_stations', {
        templateUrl: '/static/partials/monitor/monitor_stations.html',
        controller: 'MonitorStationsController',
        resolve: {
                    factory: checkTechSupport
                }
      })
      .when('/monitor_fixtures', {
        templateUrl: '/static/partials/monitor/monitor_fixtures.html',
        controller: 'MonitorFixturesController',
        resolve: {
                    factory: checkTechSupport
                }
      })
      .when('/station', {
        templateUrl: '/static/partials/station.html',
        controller: 'StationController',
        resolve: {
                    factory: checkLogin
                }
      })
      .when('/station', {
        templateUrl: '/static/partials/station.html',
        controller: 'StationController',
        resolve: {
                    factory: checkLogin
                }
      })
      .when('/station2', {
        templateUrl: '/static/partials/station_w_dctv.html',
        controller: 'StationController',
        resolve: {
                    factory: checkLogin
                }
      })
      .when('/', {
        templateUrl: '/static/partials/station.html',
        controller: 'StationController',
        resolve: {
                    factory: checkLogin
                }
      })
      .when('/login', {
        templateUrl: '/static/partials/login.html',
        controller: 'LoginController'
      })
  }
]);


var checkLogin= function ($location,$cookieStore) {
   var user = $cookieStore.get('ate_user_prof');
    console.log(user);
    if (user) {
      return true;
    } else {
        $location.path("/login");
    }
};

var checkTechSupport= function ( $location,$cookieStore) {
   var user = $cookieStore.get('ate_user_prof');
    console.log(user);
    if (!user) {
       $location.path("/login");
    } else if (!user.tech_support) {
       $location.path("/");
    } else{
      return true;
    }
};

var checkAdmin= function ( $location,$cookieStore) {
   var user = $cookieStore.get('ate_user_prof');
    console.log(user);
    if (!user) {
       $location.path("/login");
    } else if (!user.admin) {
       $location.path("/");
    } else{
      return true;
    }
};