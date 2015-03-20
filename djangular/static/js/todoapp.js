(function() {
  var app;

  app = angular.module('todoApp', ['ui.router', 'todoApp.controllers', 'todoApp.services']);

  app.config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state('taskList', {
      url: '/',
      templateUrl: 'taskList',
      controller: 'taskListController',
      resolve: {
        tasks: function(Tasks) {
          Tasks.fetch();
          return Tasks.data();
        }
      }
    }).state('taskDetail', {
      url: '/{taskId:[0-9]+}/',
      templateUrl: 'taskDetail',
      controller: 'taskDetailController',
      resolve: {
        task: function($stateParams, $log, Task) {
          var task;
          task = new Task(null);
          task.get($stateParams.taskId);
          return task;
        }
      }
    });
  });

  app.config(function($httpProvider) {
    var getCookie;
    getCookie = function(name) {
      var cookie, _i, _len, _ref;
      _ref = document.cookie.split(';');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cookie = _ref[_i];
        if (cookie && name === (cookie.trim().split('='))[0]) {
          return decodeURIComponent(cookie.trim().slice(1 + name.length));
        }
      }
      return null;
    };
    return $httpProvider.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken");
  });

}).call(this);
