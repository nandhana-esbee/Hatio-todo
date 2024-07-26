from rest_framework import serializers

from .models import Todo, Project, ProjectTodo

# serializer class project model
class ProjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Project
		fields =('Project_id', 'date','title','ListofTodo', 'Updated_at')
		
# serializer class Todo model		
class TodoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Todo
		fields = ('todo_id', 'Description','Status','Updated_Date')

# serializer class ProjectTodo model
class ProjectTodoSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectTodo
		fields = ('project', 'todo')