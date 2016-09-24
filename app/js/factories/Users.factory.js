(function(){

  'use strict';

  angular.module('elf').factory('Users', UsersFactory);

  UsersFactory.$inject = ['API', 'storage', '$rootScope', '$state', 'jwtHelper', 'mdDialog'];

  function UsersFactory(API, storage, $rootScope, $state, jwtHelper, mdDialog) {
    return {
      allUsers: [],
      singleUser: {},
      token: null,
      pending: [],
      
      getAllUsers: getAllUsers,
      login: login,
      isAuthenticated: isAuthenticated,
      loadFromStorage: loadFromStorage,
      logout: logout,
      clearUser: clearUser,
      createUser: createUser,
      isAdmin: isAdmin,
      username: username,
      userEmail: userEmail,
      mustResetPassword: mustResetPassword,
      findUserById: findUserById,
      updateUser: updateUser,
      updatePassword: updatePassword,
      userId: userId,

      getTokenSecondsRemaining: getTokenSecondsRemaining,
      isValid: isValid,
      retrieveToken:retrieveToken
    };

    function retrieveToken(){
      var token = storage.get('Token');
      return token ? token : false;
    }

    function login(creds) {
      var vm = this;
      storage.forget('Token');
      return API.post('auth', creds)
        .then(function(res){
            console.log(res);
          if(res.status === 404 || res.status === 401 || res.status === 403 ) return false;
          var token = res.data.token;
          storage.set('Token', token);
          $rootScope.token = token;
          return res;
        });
    }

    /**
     * getPendingAppts()
     * gets all appts with pendingTransfer == true
     * @returns [Array]
     */
    // function getPendingAppts(){
    //   var vm = this;
    //   vm.pending = [];
    //   API.get('appointments/pending')
    //       .then(function(res){
    //         if(res.err) return res.err;
    //         res.data.forEach(function(appt){
    //           vm.pending.push(appt);
    //         });
    //       })
    // }

    function clearUser(){
      var Users = this;
      Users.singleUser = {};
    }

    /**
     *
     * @returns {boolean}
     */
    function isAuthenticated(){
      var vm = this;
      var token = storage.get('Token');
      return token !== null || undefined;
    }


    function loadFromStorage() {
      var vm = this;
      var token = storage.get('Token');
      if(token === undefined){
       vm.logout();
      }
      if (token) {
        vm.token = token;
        $rootScope.token = vm.token;
      }
    }

    /**
     *
     */
    function logout(){
      var vm = this;
        vm.token = null;
        $rootScope.token = null;
        storage.forget('Token');
        $state.go('login');
    }

    /**
     *
     * @returns {*}
     */
    function getAllUsers() {
      var Users = this;
      return API.get('users/')
        .then(function(res){
          res.data.forEach(function(user){
            Users.allUsers.push(user);
          });
          return Users.allUsers;
        })
    }

    function createUser(newUser) {
      
      return API.post('users/', newUser)
        .then(function(res){
          return res.data;
        });
    }

    function username(){
      var decoded = jwtHelper.decodeToken(retrieveToken());
      return decoded.firstName;
    }

    function getUserType(){
      var decoded = jwtHelper.decodeToken(retrieveToken());
      return decoded.isAdmin;
    }

    function userEmail() {
      var decoded = jwtHelper.decodeToken(retrieveToken());
      return decoded.email;
    }

    function userId(){
      var decoded = jwtHelper.decodeToken(retrieveToken());
      return decoded.id;
    }

    function isAdmin(){
      var decoded = jwtHelper.decodeToken(retrieveToken());
      return decoded.isAdmin;
    }


    function mustResetPassword(){
      // var decoded = jwtHelper.decodeToken(retrieveToken());
      // return decoded.passwordChangedAt;
    }

    function findUserById(userId) {
      var Users = this;
      return API.get('users/' + userId)
        .then(function(res){
          return Users.singleUser = res.data;
        });
    }

    function updateUser(userInfo) {
      var Users = this;
      return API.put('users/' + userInfo.id, userInfo)
        .then(function(res){
          if(res.err) return res.err;
          return _.merge(Users.singleUser, res.data);
        })
    }

    function updatePassword(newPass, current){
      var Users = this;
      return API.put('users/' + vm.userId(), newPass, current)
          .then(function(res){
            if(res.err)return res.err;
            return res.data;
          });
    }




  

    function isValid(){
      var encodedToken = retrieveToken();
      if (! encodedToken) return false;
      var decodedToken = jwtHelper.decodeToken(encodedToken);
      var expTime = decodedToken.exp;
      var currentTime = moment('12:00:00', 'HH:mm:ss').format('HH:mm:ss');
      return currentTime > expTime;
    }

    function getTokenSecondsRemaining(){
      var encodedToken = retrieveToken();
      if (! encodedToken) return false;

      var decodedToken = jwtHelper.decodeToken(encodedToken);
      var tokenTime = moment.unix(decodedToken.exp);
      var currentTime = moment();

      return tokenTime.diff(currentTime, 'second');
    }

  

    

    function setStorage(token){
      storage.forget('Token');
      storage.set('Token', token);
    }
  }
}());