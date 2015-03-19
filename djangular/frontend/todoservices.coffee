services = angular.module('todoApp.services', [])

services.factory('Task', ($http, $log) ->
    class Task
        constructor : (data) ->
            if data != null
                @init(data)
        init : (data) ->
            forceTwoDigits = (val) ->
                if val < 10
                    return "0#{val}"
                return val

            new_date = new Date(data.due_date)
            @task = data.task
            @id = data.id
            @completed = !data.completed
            @due_date = new_date.getDate() + '/' + new_date.getMonth() + '/' + new_date.getFullYear() + ' at ' + forceTwoDigits(new_date.getHours()) + ':' + forceTwoDigits(new_date.getMinutes())
            @priority = data.priority

        get : (taskId) ->
            $http({method: 'GET', url: '/todo/tasks/' + taskId + '/'})
            .success (data) =>
                @init(data)
                $log.info("Succesfully fetched task")
            .error (data) =>
                $log.info("Failed to fetch task.")

        complete : ->
            data = {'completed' : @completed, 'task' : @task, 'due_date' : @due_date, 'priority' : @priority}
            $http({method: 'PUT', url: '/todo/tasks/' + @id + '/', data:data})
            .success (data) =>  
                $log.info("Task Completed")
            .error (data) =>
                $log.info("Failed to Complete")

    return Task
)

services.factory('Tasks', ($log, $http, Task) ->
    tasks = {
        all : []
    }

    fromServer: (data) ->
        tasks['all'].length = 0
        for task in data
            tasks['all'].push(new Task(task))

    fetch: ->
        $http({method: 'GET', url: '/todo/tasks'})
            .success (data) =>
                @fromServer(data)
                $log.info("Succesfully fetched tasks.")
            .error (data) =>
                $log.info("Failed to fetch tasks.")

    data : ->
        return tasks
)


