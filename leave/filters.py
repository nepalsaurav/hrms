from curses import meta
import django_filters
from .models import Leave
from crispy_forms.helper import FormHelper # type: ignore
from crispy_forms.layout import Layout, Div, Field # type: ignore



from django import forms




class LeaveFilter(django_filters.FilterSet):
    user = django_filters.CharFilter(
        label="Employee",
        field_name='user',
        lookup_expr="username"
    )
    # first_name = django_filters.CharFilter(
    #     label="First Name",
    #     lookup_expr="user__firstname"
    # )
    class Meta:
        model = Leave
        fields = ['user','start_date', 'end_date', 'leave_type', 'status']
    
        
   
    