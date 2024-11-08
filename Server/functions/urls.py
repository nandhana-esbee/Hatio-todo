from django.urls import path, include
from rest_framework import routers

# import viewsets
from .views import ProjectView, TodoView ,deletedView


# create a router object
router = routers.DefaultRouter()

router.register(r'Project-list',ProjectView, basename='project')
router.register(r'Todo-list',TodoView, basename='todo')
router.register(r'Recycle-bin',deletedView, basename='recycle')


urlpatterns = [
	path("", include(router.urls))
]
