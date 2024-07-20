from django.shortcuts import render
from rest_framework import viewsets

#import serializers
from .serializers import ProjectSerializer,TodoSerializer

# import models
from .models import Project,Todo


class TodoView(viewsets.ModelViewSet):
	serializer_class = TodoSerializer
	queryset = Todo.objects.all()

class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()