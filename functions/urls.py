from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

# import viewsets
from .views import ProjectView, TodoView

# create a router object
router = routers.DefaultRouter()

router.register(r'Project-list',ProjectView, basename='project')
router.register(r'Todo-list',TodoView, basename='todo')


urlpatterns = [
	path("", include(router.urls))
]
