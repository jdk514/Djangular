(function() {
  var services;

  services = angular.module('todoApp.services', []);

  services.factory('Task', function($http, $log) {
    var Task;
    Task = (function() {
      function Task(data) {
        if (data !== null) {
          this.init(data);
        }
      }

      Task.prototype.init = function(data) {
        var forceTwoDigits, new_date;
        forceTwoDigits = function(val) {
          if (val < 10) {
            return "0" + val;
          }
          return val;
        };
        new_date = new Date(data.due_date);
        this.task = data.task;
        this.id = data.id;
        this.completed = !data.completed;
        this.due_date = new_date.getDate() + '/' + new_date.getMonth() + '/' + new_date.getFullYear() + ' at ' + forceTwoDigits(new_date.getHours()) + ':' + forceTwoDigits(new_date.getMinutes());
        return this.priority = data.priority;
      };

      Task.prototype.get = function(taskId) {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/todo/tasks/' + taskId + '/'
        }).success(function(data) {
          _this.init(data);
          return $log.info("Succesfully fetched task");
        }).error(function(data) {
          return $log.info("Failed to fetch task.");
        });
      };

      Task.prototype.complete = function() {
        var data,
          _this = this;
        data = {
          'completed': this.completed,
          'task': this.task,
          'due_date': this.due_date,
          'priority': this.priority
        };
        return $http({
          method: 'PUT',
          url: '/todo/tasks/' + this.id + '/',
          data: data
        }).success(function(data) {
          return $log.info("Task Completed");
        }).error(function(data) {
          return $log.info("Failed to Complete");
        });
      };

      return Task;

    })();
    return Task;
  });

  services.factory('Tasks', function($log, $http, Task) {
    var tasks;
    tasks = {
      all: []
    };
    return {
      fromServer: function(data) {
        var task, _i, _len, _results;
        tasks['all'].length = 0;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          task = data[_i];
          _results.push(tasks['all'].push(new Task(task)));
        }
        return _results;
      },
      fetch: function() {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/todo/tasks'
        }).success(function(data) {
          _this.fromServer(data);
          return $log.info("Succesfully fetched tasks.");
        }).error(function(data) {
          return $log.info("Failed to fetch tasks.");
        });
      },
      data: function() {
        return tasks;
      }
    };
  });

}).call(this);
