from django.urls import path
from .import views

urlpatterns = [
    path('api/user-autocomplete', views.AutoComplete, name='country-autocomplete',)
]