(function(){
  'use strict';

  angular.module('elf').service('BootstrapService', BootstrapService);

  BootstrapService.$inject = [];

  function BootstrapService(){
    this.bootstrap = bootstrap;

    /**
     * fetch basic dropdown data on application launch
     */
    function bootstrap(){
      return 'true';
    }
  }

}());