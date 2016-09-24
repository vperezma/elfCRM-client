(function () {

  'use strict';

  angular.module('elf')
    .provider('storage', function () {
      var vm = this,
        prefix = '',
        delimiter = '.';

      /**
       * Set a prefix for our localStorage that will be used when
       * setting and getting keys.
       *
       * @param _prefix
       * @param _delimiter
       */
      vm.setPrefix = function setPrefix(_prefix, _delimiter) {
        if (!_prefix) return;
        prefix = _prefix;

        if (_delimiter) delimiter = _delimiter;
      };

      /**
       * Convenience method for finding our storage keys.
       *
       * @param key
       * @returns {*}
       */
      function getKey(key) {
        return prefix ? prefix + delimiter + key : key;
      }

      /**
       * The required $get method for our service provider.
       *
       * @returns {{set: Function, get: Function, forget: Function}}
       */
      vm.$get = function $get() {
        return {
          /**
           * Set a value into the local storage.  Simple json stringify for objects.
           *
           * @param key
           * @param val
           */
          set: function set(key, val) {
            localStorage.setItem(getKey(key), JSON.stringify(val));
          },

          /**
           * Get a value from localStorage.  If a converter is provided the
           * retrieved object will be passed through given function and
           * the result of THAT function will be used.
           *
           * @param key
           * @param converter
           * @returns {*}
           */
          get: function get(key, converter) {
            converter = angular.isFunction(converter) ? converter : angular.identity;
            return converter(JSON.parse(localStorage.getItem(getKey(key))));
          },

          /**
           * Remove an item from localStorage.
           *
           * @param key
           */
          forget: function forget(key) {
            localStorage.removeItem(getKey(key));
          }
        };
      };
    });
}());