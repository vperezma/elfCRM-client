(function(){
  'use strict';

  angular.module('elf').factory('mdDialog', mdDialogFactory);

  mdDialogFactory.$inject = ['$mdDialog'];

  function mdDialogFactory($mdDialog){
    return mdDialog;

    function mdDialog(options){
      if ( !options.controller) throw Error('Must provide template and controller to Modal');
      //var $scope = $rootScope.$new();
      //_.merge($scope, scope || {});
      var template = options.templateUrl ? options.templateUrl : 'templates/confirmation.tmpl.html';

      var modalOptions = {
        templateUrl: template,
        controller: options.controller,
        controllerAs: options.controllerAs,
        parent: angular.element(document.body),
        clickOutsideToClose:false,
        locals: options.locals
      };

      return $mdDialog.show(modalOptions);
    }
  }
}());