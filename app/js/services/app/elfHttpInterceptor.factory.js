(function(){
  'use strict';

  angular.module('elf').factory('ElfInterceptor', ElfInterceptor);

  ElfInterceptor.$inject = ['$injector', '$rootScope'];

  function ElfInterceptor($injector, $rootScope){
    return {
      request: function (config) {
        var Users = $injector.get('Users');
        if (Users.isAuthenticated()) config.headers.Authorization = 'Bearer ' + Users.token;
        return config;
      },
      requestError: function(res){
        return errorCheck(res);
      },
      response: function(response){
        return response;
      },
      responseError: function(res){
        return errorCheck(res);
      }
    };

    function errorCheck(res){
      switch(res.status){
        case 500:
          res.err =  new Error('Server error. Please try again later');
          return res;
        case 401:
          $rootScope.$broadcast('unauthorized');
          return res;
        case 404:
          res.err = new Error('Not found');
          return res;
        case -1:
          res.err = new Error('Server not responding. Please contact system administrator.');
          $rootScope.$broadcast('notConnected');
          return res;
        case !200:
          res.err = new Error('Unxepected Error');
          return res;
        default:
          return res
      }
    }
  }
}());