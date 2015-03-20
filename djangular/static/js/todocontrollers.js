(function() {
  var controllers;

  controllers = angular.module('todoApp.controllers', []);

  controllers.controller('taskListController', function($scope, $state, $log, tasks, meetings) {
    $scope.tasks = tasks.all;
    $scope.meetings = meetings.all;
    return $scope.remove = function(task) {
      var index;
      index = $scope.tasks.indexOf(task);
      $scope.tasks.splice(index, 1);
      return $log.info("Completed Task Removed");
    };
  });

  controllers.controller('taskDetailController', function($scope, $state, $log, task) {
    return $scope.task = task;
  });

  controllers.controller('meetingDetailController', function($scope, $state, $log, meeting) {
    return $scope.meeting = meeting;
  });

  controllers.controller('meetingListController', function($scope, $state, $log, meetings) {
    return $scope.meetings = meetings.all;
  });

}).call(this);
