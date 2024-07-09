from django.contrib import admin
from .models import Leave

# Register your models here.

@admin.register(Leave)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'leave_type', 'start_date', 'end_date', 'status']
    list_filter = ['status', 'leave_type']
    search_fields = ['start_date']