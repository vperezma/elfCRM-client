(function(){
  'use strict';

  angular.module('elf.login').controller('LoginController', LoginController);

  LoginController.$inject = ['Users', '$state'];

  function LoginController(Users, $state){
    var vm = this;
    vm.authenticate = authenticate;
    vm.creds = {};
    vm.resetPassword = resetPassword;
    vm.setPassword = setPassword;
    vm.credInvalid = false;
    vm.passwordSent = false;

    //This function will fire off an email that will allow user to reset their password with given link
    //Waiting on mail setup on backend
    function resetPassword(){
      vm.passwordSent = true;
    }
    
    function setPassword(newPass){
      
      Users.updateUser();
    }


    function authenticate(creds) {
      Users.login(creds).then(function(res){
        if(!res || res.status === 401){
          vm.credInvalid = true;
        }else
          if(Users.isAuthenticated()){
            $state.go('body.opening');
          }
      })
    }
  }


}());