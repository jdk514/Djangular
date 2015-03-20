controllers = angular.module('todoApp.controllers', [])

controllers.controller('taskListController', ($scope, $state, $log, tasks, meetings) ->
  $scope.tasks = tasks.all
  $scope.meetings = meetings.all

  $scope.remove = (task) ->
  	index = $scope.tasks.indexOf(task);
  	$scope.tasks.splice(index, 1);
  	$log.info("Completed Task Removed")
)

controllers.controller('taskDetailController', ($scope, $state, $log, task) ->
  $scope.task = task
)

controllers.controller('meetingDetailController', ($scope, $state, $log, meeting) ->
	$scope.meeting = meeting 
)

controllers.controller('meetingListController',  ($scope, $state, $log, meetings) ->
	$scope.meetings = meetings.all
)