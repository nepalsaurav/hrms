from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from allauth.account.views import LoginView # type: ignore
from allauth.account.views import LogoutView # type: ignore
from allauth.account.views import PasswordChangeView # type: ignore



admin.autodiscover()

admin.site.login = LoginView.as_view()
admin.site.logout = LogoutView.as_view()
admin.site.password_change = PasswordChangeView.as_view()



urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("", include("pages.urls")),
    path("", include("leave.urls")),
    path("", include("accounts.urls")),
]

# if settings.DEBUG:
#     import debug_toolbar # type: ignore

#     urlpatterns = [
#         path("__debug__/", include(debug_toolbar.urls)),
#     ] + urlpatterns
