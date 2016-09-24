
(function(){
  'use strict';

  angular.module('elf').controller('mdDialogConfirmController', mdDialogConfirmController);

  mdDialogConfirmController.$inject = ['$mdDialog', 'locals'];

  function mdDialogConfirmController($mdDialog, locals){
    var vm = this;

    vm.hide = hide;
    vm.cancel = cancel;
    vm.message = locals.message ? locals.message : 'Please Confirm';

    /**
     *
     */
    function hide(){
      $mdDialog.hide(true);
    }

    /**
     * cancel changes
     */
    function cancel(){
      $mdDialog.cancel();
    }
  }
}());