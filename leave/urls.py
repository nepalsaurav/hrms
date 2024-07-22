from django.urls import path
from .import views

urlpatterns = [
    path("api/leave/", views.LeaveLists.as_view(), name="leave_home"),
    path("api/leave/<int:id>/", views.leave_single_view, name="leave_single_view"),
    path("api/leave/add/", views.leave_add, name="leave_add"),
    path("api/leave/edit/<int:id>/", views.api_edit_leave, name="api_edit_leave")
]