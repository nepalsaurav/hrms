from django.contrib import admin
from .models import Leave
from import_export.admin import ImportExportModelAdmin
from .forms import LeaveForm
from import_export import resources 

# Register your models here.


class LeaveResource(resources.ModelResource):
     class Meta:
         model = Leave


class LeaveRequestAdmin(ImportExportModelAdmin):
    list_display = ['user', 'leave_type', 'start_date', 'end_date', 'status']
    list_filter = ['status', 'leave_type', 'user__username']
    search_fields = ['user__username']
    autocomplete_fields = ['user']
    resource_classes = [LeaveResource]

admin.site.register(Leave, LeaveRequestAdmin)