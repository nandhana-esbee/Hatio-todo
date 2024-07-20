from django.db import models
from users.models import Users
# from django.contrib.auth.models import User

# Create your models here.

class Todo(models.Model):
    #Todo: Unique Id, Description, Status, Created Date, Updated Date.

    # todo_user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo_id = models.AutoField(primary_key=True)
    Description = models.CharField(max_length=100)
    Status = models.BooleanField(default=False)
    Created_Date = models.DateTimeField(auto_now_add=True)
    Updated_Date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Description

class Project(models.Model):
    #Unique Id, Title, Created Date, List of Todos
    project_user = models.ForeignKey(Users, on_delete=models.CASCADE)
    Project_id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
    ListofTodo = models.ManyToManyField(Todo)
    Updated_at= models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title           