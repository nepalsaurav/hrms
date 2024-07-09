from django.urls import path

from .views import HomePageView, AboutPageView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path("", login_required(HomePageView.as_view()), name="home"),
    path("about/", login_required(AboutPageView.as_view()), name="about"),
]
