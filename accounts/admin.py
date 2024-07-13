# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.urls import path
from django.shortcuts import render
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username',]
    model_fields = [field.name for field in CustomUser._meta.get_fields() if field.concrete]
    add_form_template = 'admin/user_change_form.html'  # Use the custom template
    change_form_template = 'admin/user_change_form.html'
    add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': model_fields
    }),
)

admin.site.register(CustomUser, CustomUserAdmin)
