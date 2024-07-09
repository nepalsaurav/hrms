from django.urls import path
from .import views

urlpatterns = [
    path("api/leave", views.leave_home, name="leave_home"),
    path("api/leave/add", views.leave_add, name="leave_add"),
]