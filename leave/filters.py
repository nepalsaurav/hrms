from curses import meta
import django_filters
from .models import Leave


from django import forms




class LeaveFilter(django_filters.FilterSet):
    user = django_filters.CharFilter(
        field_name='user',
        lookup_expr="username"
    )
    class Meta:
        model = Leave
        fields = ['user','start_date', 'end_date', 'leave_type']
    
        
   
    