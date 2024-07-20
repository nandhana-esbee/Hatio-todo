# from . import views
# from rest_framework import routers
# from django.urls import path,include
# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )
# # import viewsets
# from .views import  LogoutAPIView ,LoginAPIView, RegisterView

# # create a router object
# router = routers.DefaultRouter()

# router.register(r'register',RegisterView, basename='register')
# router.register(r'login',LoginAPIView, basename='login')
# router.register(r'logout',LogoutAPIView, basename='logout')
# router.register(r'api/token/refresh',TokenRefreshView, basename='token_refresh')


# urlpatterns = [
# 	path("", include(router.urls))
# ]

from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/',views.RegisterView.as_view(),name="register"),
    path('login/',views.LoginAPIView.as_view(),name="login"),
    path('logout/', views.LogoutAPIView.as_view(), name="logout"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]