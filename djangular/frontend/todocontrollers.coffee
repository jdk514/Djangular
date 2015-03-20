controllers = angular.module('todoApp.controllers', [])

controllers.controller('taskListController', ($scope, $state, $log, tasks, meetings) ->
  $scope.tasks = tasks.all
  $scope.meetings = meetings.all
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