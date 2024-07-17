from django.contrib import admin

from accounts.models import CustomUser
from .models import Leave
from import_export.admin import ImportExportModelAdmin
from .forms import LeaveForm
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget

# Register your models here.


class LeaveResource(resources.ModelResource):
     user = fields.Field(attribute='user', widget=ForeignKeyWidget(CustomUser,field='username'))
     class Meta:
        #  fields = ('user', 'leave_type', 'start_date', 'end_date', 'reasons', 'status',)
        model = Leave
        
         


class LeaveRequestAdmin(ImportExportModelAdmin):
    list_display = ['user', 'leave_type', 'start_date', 'end_date', 'status']
    list_filter = ['status', 'leave_type', 'user__username']
    search_fields = ['user__username']
    autocomplete_fields = ['user']
    list_per_page = 10
    resource_classes = [LeaveResource]
    form = LeaveForm

admin.site.register(Leave, LeaveRequestAdmin)