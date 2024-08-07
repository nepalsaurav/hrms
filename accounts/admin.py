# admin.py
import json
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.http import HttpRequest
from django.http.response import HttpResponse
from django.urls import path
from .forms import CustomGroupForm, CustomUserChangeForm, CustomUserCreationForm
from .models import Branch, CustomUser, Department
from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from django.core import serializers

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username','email', 'last_login', 'department']
    change_form_template = "admin/user_change_form.html"
    form = CustomUserChangeForm
   
    def add_view(self, request: HttpRequest, form_url: str = "", extra_context: None = None) -> HttpResponse:
        self.add_form = CustomUserCreationForm
        return super().add_view(request, form_url, extra_context)
    
    def change_view(self, request: HttpRequest, object_id: str, form_url: str = "", extra_context: dict[str, bool] | None = None) -> HttpResponse:
        if request.method == "GET":
            self.form = CustomUserChangeForm
            print(extra_context)
            context = self.admin_site.each_context(request=request)
            

            print(context)
        return super().change_view(request, object_id, form_url, extra_context)

   

class CustomGroupsAdmin(GroupAdmin):
    form = CustomGroupForm
    model = Group
    add_form_template = "admin/group_change_form.html"
    change_form_template = "admin/group_change_form.html"
    def add_view(self, request: HttpRequest, form_url: str = "", extra_context: None = "") -> HttpResponse:
        expanded_permissions = permission_dict()
        extra_context = {
            "permission_dict" : json.dumps(expanded_permissions)
        }
        return super().add_view(request, form_url, extra_context)
    def change_view(self, request: HttpRequest, object_id: str, form_url: str = "", extra_context: dict[str, bool] | None = "") -> HttpResponse:
        obj = self.get_object(request=request, object_id=object_id)
        form_class = self.get_form(request=request, obj=obj)  # Get the form class
        form = form_class(instance=obj)  # Instantiate the form with the object
        group_name = form['name'].value()
        active_form = form['permissions'].value()
        expanded_permissions = permission_dict()
        extra_context = {
            "permission_dict" : json.dumps(expanded_permissions),
            "active_form" : json.dumps(active_form)
        }
        print(group_name)
        print(active_form)
        return super().change_view(request, object_id, form_url, extra_context)
    

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)
admin.site.register(Group, CustomGroupsAdmin)
admin.site.register(Department)
admin.site.register(Branch)


def permission_dict(id = None):
    if id == None:
        Permissions = Permission.objects.all()
    else:
        Permissions = Permission.objects.filter(pk=id)
    expanded_permissions = []
    # Iterate over each permission
    for permission in Permissions:
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


