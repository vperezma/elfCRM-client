(function(){

  angular.module('elf', [
                 'ngAnimate',
                 'ui.router',
                 'templates',
                 'ngSanitize',
                 'ngAria',
                 'ngMessages',
                 'ngMaterial',
                 's3.usStates',
                 'angular-jwt',
                 'ngMask',
                 'elf.env',
                 'elf.login'])

    .config(function($stateProvider,
                     $urlRouterProvider,
                     $httpProvider,
                     $locationProvider,
                     storageProvider
                     )
    {
      //removes # from url, currently disable do to issue when refreshing browser window
      //$locationProvider.html5Mode({enabled: true, requireBase: false});

      $urlRouterProvider.otherwise(function($injector){
        var Users = $injector.get('Users');
        var $state = $injector.get('$state');
        if(!Users.isAuthenticated()){
          $state.go('login');
        }else {
          $state.go('body.opening');
        }
      });

      $stateProvider
        .state('body', {
          templateUrl: 'body/body.html',
          controllerAs: 'Body',
          controller: 'BodyController',
          resolve:{
              pageTitle: function pageTitle($rootScope){
              $rootScope.pageTitle = "Welcome"
            }
            }
      }).state('body.opening', {
          url: '/opening',
          templateUrl:'opening/opening.html',
          controller:'OpeningController',
          controllerAs: 'Opening',
          resolve: {
            pageTitle: function pageTitle($rootScope){
              $rootScope.pageTitle = "Schedule"
            }
          }
      });
      storageProvider.setPrefix('elf-token');

        $httpProvider.interceptors.push('ElfInterceptor');
    })
      .run(function ($rootScope, Users, $state, ElfStateChange,$mdToast) {
        /**
         * Load up user details from localStorage.
         */
        Users.loadFromStorage();
        /**
         * Listen for stateChangeStart events, when one is encountered,
         * check the state data to see if login is required to access
         * the state.  If so, and the user is not authenticated
         * then head to the login.
         */
        $rootScope.$on('$stateChangeStart', ElfStateChange.onStateChange);

        /**
         * logout user's when db returns unauthorized
         */
        $rootScope.$on('unauthorized', function(){
          Users.logout();
        });

        $rootScope.$on('$stateChangeSuccess', function() {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          $rootScope.loading = false;
        });

        $rootScope.$on('$stateChangeError', function(){
          $state.go('body.opening');
          
        });

        $rootScope.$on('notConnected', function(){
          $mdToast.showSimple('Server not responding. Please contact system administrator.');
        })

  });

}());