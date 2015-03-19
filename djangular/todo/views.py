from rest_framework import generics, permissions
from .models import Task, Meeting
from .serializers import TaskSerializer, MeetingSerializer
from django.shortcuts import render
from datetime import datetime
import pdb


class TaskList(generics.ListCreateAPIView):
    model = Task
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class TaskDateList(generics.ListCreateAPIView):
	model = Task
	serializer_class = TaskSerializer
	permission_classes = [
		permissions.AllowAny
	]

	def get_queryset(self):
		year = self.kwargs.get("year")
		month = self.kwargs.get("month")
		day = self.kwargs.get("day")
		tasks = Task.objects.filter(due_date__day = day, due_date__month = month, due_date__year = year)
		return tasks

class TaskDetail(generics.UpdateAPIView):
	model = Task
	serializer_class = TaskSerializer
	lookup_url_kwarg = 'task_pk'
	permission_classes = [
		permissions.AllowAny
	]

class MeetingDetail(generics.UpdateAPIView):
	model = Meeting
	serializer_class = MeetingSerializer
	lookup_url_kwarg = 'meeting_pk'
	permission_classes = [
		permissions.AllowAny
	]

class MeetingList(generics.ListCreateAPIView):
    model = Meeting
    serializer_class = MeetingSerializer
    permission_classes = [
        permissions.AllowAny
    ]

def index(request):
    return render(request, 'todo/index.html')
