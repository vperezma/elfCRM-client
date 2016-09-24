(function(){
  'use strict';

  angular.module('elf.login', ['ngAnimate',
                                    'ui.router',
                                    'templates',
                                    'ngSanitize',
                                    'ngAria',
                                    'ngMessages',
                                    'ngMaterial',
                                    's3.usStates',
                                    'angular-jwt'])
      .config(function($stateProvider){
        $stateProvider.state('login',{
          url: '/login',
          templateUrl: 'login/login.html',
          controller: 'LoginController',
          controllerAs: 'Login',
          resolve: {
              
            }
        })
        .state('password-reset',{
            url: '/password-reset',
            templateUrl: 'login/password-reset.html',
            controller: 'LoginController',
            controllerAs: 'Login',
            resolve: {
                
            }
        })
        .state('set-password', {
            url: '/reset/:token',
            templateUrl: 'login/set-password.html',
            controller: 'LoginController',
            controllerAs: 'Login',
            resolve: {
                
            }
        })
        .state('logout',{
          url: '/logout',
          controller: function (Users) {
            Users.logout();
          }
        })
      })
}());