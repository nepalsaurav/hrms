# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.urls import path
from django.shortcuts import render
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    change_form = CustomUserChangeForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username','email']
    change_form_template = "admin/user_change_form.html"
   

admin.site.register(CustomUser, CustomUserAdmin)
