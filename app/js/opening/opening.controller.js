(function(){
  'use strict';

  angular.module('elf').controller('OpeningController', OpeningController);

  OpeningController.$inject = ['$state'];

  function OpeningController($state ){
    var vm = this;
    // vm.newExaminee = newExaminee;
    // vm.searchExaminees = searchExaminees;

    // function newExaminee(){
    //   Examinees.examinee = {};
    //   $state.go('body.appt.scheduling', {newExaminee: true});
    // }

    // function searchExaminees(){
    //   Examinees.examinee = {};
    //   $state.go('body.searchExaminees');
    // }
  }
}());