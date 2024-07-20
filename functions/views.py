# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
#import serializers
from .serializers import ProjectSerializer,TodoSerializer
from rest_framework.permissions import IsAuthenticated

# import models
from .models import Project,Todo


class TodoView(viewsets.ModelViewSet):
	serializer_class = TodoSerializer
	queryset = Todo.objects.all()

class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    permission_classes = (IsAuthenticated,)
    # #create a new project
    # def create(self, request, *args, **kwargs):
    #     #check whether the user is logged in or not
    #     if request.user.is_authenticated:
    #         #get the project name from the request
    #         project_name = request.data.get('title')
    #         #create a new project
    #         project = Project.objects.create(title=project_name, project_user=request.user)
    #         project.save()
    #         return Response({'message': 'Project created successfully'}, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response({'message': 'Please login to create a project'}, status=status.HTTP_403_FORBIDDEN)

    