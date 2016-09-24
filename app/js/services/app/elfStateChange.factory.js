(function(){
  'use strict';

  angular.module('elf').factory('ElfStateChange', ElfStateChange);

  ElfStateChange.$inject = ['Users', '$state', '$rootScope'];

  function ElfStateChange(Users, $state, $rootScope) {
    return {
      onStateChange: function onStateChange(event, toState) {
        //   console.log('test', Users.isAuthenticated());
        // $rootScope.loading = true;
        // var stateRequiresLogin = toState.access && toState.access.requiresLogin,
        //     stateRequiresAdmin = toState.access && toState.access.requiresAdmin;
        // if (stateRequiresLogin &&
        //   (!Users.isAuthenticated()))
        // {
        //   event.preventDefault();
        //   $state.go('login');
        // }else if(stateRequiresAdmin){
        //   if(Users.isAdmin() === false) {
        //     event.preventDefault();
        //     Users.logout();
        //   }
        // }else if (stateRequiresLogin && User.isAdmin() ===false ) {
        //     console.log('Here');
        //       event.preventDefault();
        //       $rootScope.loading = false;
        //       $state.go('body.opening');
        // } 
      }
    }
  }
}());