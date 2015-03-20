(function() {
  var controllers;

  controllers = angular.module('todoApp.controllers', []);

  controllers.controller('taskListController', function($scope, $state, $log, tasks, meetings) {
    $scope.tasks = tasks.all;
    return $scope.meetings = meetings.all;
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
