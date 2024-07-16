# admin.py
import json
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.http import HttpRequest
from django.http.response import HttpResponse
from django.urls import path
from .forms import CustomGroupForm, CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser
from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from django.core import serializers

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username','email', 'last_login']
    change_form_template = "admin/user_change_form.html"
    form = CustomUserChangeForm
    def add_view(self, request: HttpRequest, form_url: str = "", extra_context: None = None) -> HttpResponse:
        self.form = CustomUserCreationForm
        self.add_form = CustomUserCreationForm
        return super().add_view(request, form_url, extra_context)
    def change_view(self, request: HttpRequest, object_id: str, form_url: str = "", extra_context: dict[str, bool] | None = "") -> HttpResponse:
        self.form = CustomUserChangeForm
        return super().change_view(request, object_id, form_url, extra_context)
   

class CustomGroupsAdmin(GroupAdmin):
    form = CustomGroupForm
    model = Group
    add_form_template = "admin/group_change_form.html"
    def add_view(self, request: HttpRequest, form_url: str = "", extra_context: None = "") -> HttpResponse:
        expanded_permissions = permission_dict()
        extra_context = {
            "permission_dict" : json.dumps(expanded_permissions)
        }
        return super().add_view(request, form_url, extra_context)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)
admin.site.register(Group, CustomGroupsAdmin)


def permission_dict():
    expanded_permissions = []

    # Iterate over each permission
    for permission in Permission.objects.all():
        # Get the related content type object
        content_type = ContentType.objects.get(id=permission.content_type_id)
        
        # Construct the dictionary with expanded content type
        permission_dict = {
            'id': permission.id,
            'name': permission.name,
            'codename': permission.codename,
            'content_type': {
                'id': content_type.id,
                'app_label': content_type.app_label,
                'model': content_type.model,
                'name':content_type.name
            }
        }
        # Add the dictionary to the list
        expanded_permissions.append(permission_dict)
    return expanded_permissions
