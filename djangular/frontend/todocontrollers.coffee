controllers = angular.module('todoApp.controllers', [])

controllers.controller('taskListController', ($scope, $state, $log, tasks) ->
  $scope.tasks = tasks.all
)

controllers.controller('taskDetailController', ($scope, $state, $log, task) ->
  $scope.task = task
)