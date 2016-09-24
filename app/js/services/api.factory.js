(function () {

  'use strict';

  angular.module('elf')
    .factory('API', API);

  API.$inject = ['ENV', '$http','$q'];

  function API(ENV, $http, $q) {
    var api = ENV.API_URL;

    /**
     * Convenience for generating a url pointing at our api.
     *
     * @param url
     * @returns {string}
     */
    function endpoint(url) {
      return api + url;
    }

    function endpointUrl(url){
      return !(url === 'login' || url === 'logout' || url === 'forgot' || url ==='reset');
    }

    /**
     * Build a request object for feeding to angular's $http function.
     *
     * @param method
     * @param url
     * @param data
     * @param headers
     * @returns {{method: *, url: string, headers: *, data: *}}
     */
    function req(method, url, data, headers) {
      return {
        method: method,
        url: endpoint(url),
        headers: _.merge({}, headers || {}),
        data: _.merge({}, data || {})
      };
    }

    /**
     * Our API API :)
     */
    return {
      get: function get(endpoint, headers) {
        var defer = $q.defer();
        defer.resolve($http(req('get', endpoint, {}, headers)));
        return defer.promise;
      },
      post: function post(endpoint, data, headers) {
        var defer = $q.defer();
        defer.resolve($http(req('post', endpoint, data, headers)));
        return defer.promise;
      },
      put: function put(endpoint, data, headers) {
        var defer = $q.defer();
        defer.resolve($http(req('put', endpoint, data, headers)));
        return defer.promise;
      },
      del: function del(endpoint, data, headers) {
        var defer = $q.defer();
        defer.resolve($http(req('delete', endpoint, data, headers)));
        return defer.promise;
      }
    };
  }
}());