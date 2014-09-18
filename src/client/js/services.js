'use strict';

angular.module('ate.monitor').service('Monitor',
  ['$rootScope','$http','$location',
    function($rootScope, $http, $location) {
    // We return this object to anything injecting our service
    var Service = {
    //'fixtures':[],
    'tfList':[],
    'activeIdx':0,
    'activeTf':false,
    'loaded':false
    };
    Service.setActiveIdx = function(idx){
       this.activeIdx = idx;
       if(this.activeIdx >= 0){
          this.activeTf = this.tfList[this.activeIdx];
       }
    };


    //var domain = window.location.host
    var ws = new WebSocket("ws://"+ window.location.host +"/ws");
    ws.onopen = function(){
        Service.status='Open';
        $rootScope.$apply();
    };
    ws.onmessage = function(ev){
      var json = JSON.parse(ev.data);
      console.log(json);
      if (json.msg_type == 'list' ){
        console.log('list');
        Service.tfList = json.list;
        //console.log(Service.tfList);
      }
      if (json.msg_type == 'item' ) {
        for (var i = 0; i < Service.tfList.length; i++) {
          if (Service.tfList[i].ip_address == json.ip_address){
            Service.tfList[i] = json.item;
          }
        }
      }
      if (json.msg_type == 'response' ) {
        for (var i = 0; i < Service.tfList.length; i++) {
          if (Service.tfList[i].ip_address == json.ip_address){
            Service.tfList[i] = json.item;
          }
        }
      }
      if (json.msg_type == 'command' ) {
        var body = JSON.parse(json.body);
        console.log(body);
        console.log(body.action);
        console.log(body.ip);
        for (var i = 0; i < Service.tfList.length; i++) {
          if (Service.tfList[i].ip == body.ip){
            console.log(i);
            console.log(body.cmdIdx);

            //console.log(Service.tfList[i].commandResult);

            Service.tfList[i].commandResult[body.cmdIdx].res = body.msg;
            //$rootScope.$apply();
          }
        }
      }
      $rootScope.$apply();
    };
    ws.onclose = function(ev){
        Service.status = 'Closed';
        $rootScope.$apply();
    };
    ws.onerror = function(ev){
      Service.status = 'Error';
      $rootScope.$apply();
      console.log('ws.onerror');
    };
    Service.bbbCommand = function(tf,command, params){
        //tf.commandEnabled = false;
        //var commandLen = tf.commandResult.push({'command':command,status:'sent...',res:''});
        var data = {ip_address:tf.ip_address,
                command:command,
                params:params
                //cmdIdx:commandLen - 1
        };
        console.log(data);
        $http({method: 'POST', url: '/tf',data:data}).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            console.log(data);
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(data);
          });
    };
    //Service.loadTfs();
    Service.getTfList = function(){
        return Service.tfList;
    };
    return Service;

}])
  .service('UserService',
  ['$http',
    function ($http) {

      // We return this object to anything injecting our service

      var userService = {
        isLoaded:false
      };

      userService.addUser =  function (user) {
        var request = $http({
          method: "post",
          url: "admin/users",
          params: {
            action: "add"
          },
          data: {
            user: user
          }
        });
        return( request.then(this.handleSuccess, this.handleError) );
      };

      userService.updateUser =  function (user) {
        var request = $http({
          method: "put",
          url: "admin/users",
          params: {
            action: "update"
          },
          data: {
            user_id:user._id,
            user: user
          }
        });
        return( request.then(this.handleSuccess, this.handleError) );
      };


      // I get all users.
      userService.getUsers =  function () {

        var request = $http({
          method: "get",
          url: "admin/users",
          params: {
            action: "get"
          }
        });

        return( request.then(this.handleSuccess, this.handleError) );

      };
      // I get a single user
      userService.getUser =  function (id) {

        var request = $http({
          method: "get",
          url: "admin/users",
          params: {
            action: "getone",
            id:id
          }
        });

        return( request.then(this.handleSuccess, this.handleError) );

      };

      // I remove the friend with the given ID from the remote collection.
      userService.removeUser =  function (id) {

        var request = $http({
          method: "delete",
          url: "admin/users",
          params: {
            action: "delete"
          },
          data: {
            id: id
          }
        });

        return( request.then(this.handleSuccess, this.handleError) );

      };


      // ---
      // PRIVATE METHODS.
      // ---

      // error Handler
      userService.handleError =  function (response) {
        // The API response from the server should be returned in a
        // normalized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (!angular.isObject(response.data) || !response.data.message) {
          return( $q.reject("An unknown error occurred.") );
        }
        // Otherwise, use expected error message.
        return( $q.reject(response.data.message) );
      };

      // I transform the successful response, unwrapping the application data
      // from the API response payload.
      userService.handleSuccess =  function (response) {
        return( response.data );
      };
      return userService;

    }])


//User service
.factory('User', ['$resource',
  function($resource) {
    return $resource('/users/admin',{},
      {update: {method: 'PUT'}}
    );
  }
])
//TestFixtureAdmin service
.factory('TestFixtureAdmin', ['$resource',
  function($resource) {
    return $resource('/admin/test_fixture',{},
      {update: {method: 'PUT'}}
    );
  }
])
//StationAdmin service
.factory('StationAdmin', ['$resource',
  function($resource) {
    return $resource('/admin/station',{},
      {update: {method: 'PUT'}}
    );
  }
])
//BatchNumberAdmin service
.factory('BatchNumberAdmin', ['$resource',
  function($resource) {
    return $resource('/admin/batch_number',{},
      {update: {method: 'PUT'}}
    );
  }
])

//Station service
.factory('Station', ['$resource',
  function($resource) {
    return $resource('/station',{},
      {update: {method: 'PUT'}}
    );
  }
])
//Fixture service
.factory('Fixture', ['$resource',
  function($resource) {
    return $resource('/fixture',{},
      {update: {method: 'PUT'}}
    );
  }
])
//ProductConfig service
.factory('ProductConfig', ['$resource',
  function($resource) {
    return $resource('/product_config/admin',{},
      {update: {method: 'PUT'}}
    );
  }
])
//TseConf service
.factory('TseConf', ['$resource',
  function($resource) {
    return $resource('/tse_conf/admin',{},
      {update: {method: 'PUT'}}
    );
  }
]);
