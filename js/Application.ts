/// <reference path='_all.ts'/>

/**
 * The manin TodoMVC app module.
 * 
 * @type {angular.Module}
 */
module todos {
    'use strict';

    var todomvc = angular.module('todomvc',[])
            .controller('todoCtrl',TodoCtrl)
            .directive('todoBlur', todoBlur)
            .directive('todoFocucs', todoFocus)
            .directive('todoEscape', todoEscape)
            .service('todoStorage', TodoStorage).
            config(['$locationProvider', function($locationProvider) {
                $locationProvider.hashPrefix('');
              }]);
}