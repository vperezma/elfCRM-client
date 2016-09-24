(function(){
  'use strict';

  angular.module('elf').controller('BodyController', BodyController);

  BodyController.$inject = ['$mdSidenav',
                            '$rootScope',
                            '$scope' ,
                            'Users',
                             'ENV', '$window', '$state'];

  function BodyController($mdSidenav,
                          $rootScope,
                          $scope,
                          Users,
                           ENV, $window, $state)
  {
    var vm = this;
  
    // vm.isAdmin = Users.isAdmin();
    // vm.username = Users.username();
    // vm.userEmail = Users.userEmail();
    // vm.clientVersion = VERSION;
    // vm.apiVersion = apiVersion;
    vm.pageTitle = $rootScope.pageTitle;
    vm.showLoadBar = false;
    // vm.pending = Users.pending;
    // vm.appointment = Appointments;
    // vm.admin = Users.isAdmin();

    vm.currentDate  = moment().format('YYYY-MM-DD');


    // Raven.setUserContext({
    //   user: vm.username,
    //   email: vm.userEmail,
    //   id: Users.userId(),
    //   api: vm.apiVersion,
    //   client: vm.clientVersion,
    //   environment: ENV.ENVIRONMENT
    // });
console.log(this);
    vm.fullscreenToggle = fullscreenToggle;
    vm.openNavigation = openNavigation;
    vm.close = close;
    // vm.goToProfile = goToProfile;
    vm.logout = logout;
    function openNavigation(){
      $mdSidenav('sideNav').toggle();
    }

    function close(){
      $mdSidenav('sideNav').close()
    }

    $scope.$watch(function(){
      return $rootScope.pageTitle;
    }, function(){
      vm.pageTitle = $rootScope.pageTitle;
    });

    function fullscreenToggle(){
      if (screenfull.enabled) {
        screenfull.toggle();
      }
    }

    // $scope.$watch(function(){
    //   return $rootScope.loading;
    // }, function(){
    //   if($rootScope.loading) {
    //       console.log('here');
    //     vm.loading = 'indeterminate'
    //   }else{
    //       console.log('not here');
    //     vm.loading = '';
    //   }
    // });



    function logout(){
      vm.close();
      Users.logout();
    }

  }
}());