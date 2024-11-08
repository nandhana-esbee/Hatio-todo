# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
#import serializers
from .serializers import ProjectSerializer,TodoSerializer,ProjectTodoSerializer
from rest_framework.permissions import IsAuthenticated
#action decorator import
from rest_framework.decorators import action
# import models
from .models import Project,Todo,ProjectTodo
from users.models import Users


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = (IsAuthenticated,)

    #create a new todo
    def create(self, request, *args, **kwargs):
        todo_desc = request.data.get('Description')
        if not todo_desc:
            return Response({'error': 'Description is required'}, status=status.HTTP_400_BAD_REQUEST)
        todo_values = request.data
        serializer = TodoSerializer(data=todo_values)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            todo_data = serializer.data
            return Response(todo_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def projecttodoupdate(self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        project_id = request.data.get('Project_id')
        if not project_id and not todo_id:
            return Response({'error': 'Project_id and Todo_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProjectTodoSerializer(data={'project': project_id, 'todo': todo_id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            project_todo_data = serializer.data
            return Response(project_todo_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #makes the todo recycled and visible
    @action(detail=True, methods=['post'])
    def recycle(self, request, *args, **kwargs):
        todoid = kwargs.get('pk')
        todo = Todo.objects.filter(todo_id=todoid).first()
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TodoSerializer(todo ,data={'isRecycled':True,'isVisible':True}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Todo recycled successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    #update a todo
    def update(self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        todo = Todo.objects.filter(todo_id=todo_id).first()
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        todo_update = request.data

        #if description is not in the request data, use the existing description
        if "Description" not in todo_update:
            todo_update["Description"] = todo.Description

        serializer = TodoSerializer(todo, data=todo_update)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            todo_data = serializer.data
            return Response(todo_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete a todo
    def destroy(self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        todo = Todo.objects.filter(todo_id=todo_id).first()
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        #todo.delete()
        serializer = TodoSerializer(todo,data={'isVisible':False}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Todo deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        todo = Todo.objects.filter(todo_id=todo_id,isVisible=True).first()
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #get all todos
    def list(self, request, *args, **kwargs):
        #need to pass project_id through params
        project_id = request.query_params.get('Project_id')
        todo_ids = ProjectTodo.objects.filter(project=project_id).values_list('todo', flat=True)
        todos = Todo.objects.filter(todo_id__in=todo_ids,isVisible =True).order_by('-Status')
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
      

class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    permission_classes = (IsAuthenticated,)
    
    #create a new project
    def create(self, request, *args, **kwargs):
        #get user id
        user = request.user.id
        user_instance = Users.objects.get(id=user)
        project_title = request.data.get('title')

        if not project_title:
            return Response({'error': 'Title is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        project_values = request.data
        serializer = ProjectSerializer(data=project_values)
        if serializer.is_valid(raise_exception=True):
            serializer.save(project_user=user_instance)
            project_data = serializer.data
            return Response(project_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #update a project
    def update(self, request, *args, **kwargs):
        project_id = kwargs.get('pk')
        project = Project.objects.filter(Project_id=project_id).first()

        #if project created user is not the same as the user trying to update the project (optional)
        user = request.user.id
        project_user = project.project_user.id
        if user != project_user:
            return Response({'error': 'You are not allowed to update this project .Login first!!!'}, status=status.HTTP_403_FORBIDDEN)

        if not project:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
        
        project_values = request.data

        #if title is not in the request data, use the existing title
        if "title" not in project_values:
            project_values["title"] = project.title

        serializer = ProjectSerializer(project, data=project_values)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            project_data = serializer.data
            return Response(project_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #delete a project
    def destroy(self, request, *args, **kwargs):
        project_id = kwargs.get('pk')
        project = Project.objects.filter(Project_id=project_id)
        if not project:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
        project.delete()
        return Response({'message': 'Project deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    #get all projects
    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        projects = Project.objects.filter(project_user=user_id).order_by('-Updated_at')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
  
#List the deleted todos
class deletedView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = (IsAuthenticated,)
    def list(self, request, *args, **kwargs):
        todos = Todo.objects.filter(isVisible =False).order_by('-Status')
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #restore the deleted todo
    @action(detail=True, methods=['post'])
    def restore(self, request, *args, **kwargs):
        todoid = kwargs.get('pk')
        todo = Todo.objects.filter(todo_id=todoid).first()
        if not todo:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(todo ,data={'isRecycled':True,'isVisible':True}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Todo restored successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)