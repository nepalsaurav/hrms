from django import forms
from crispy_forms.helper import FormHelper # type: ignore
from crispy_forms.layout import Layout, Field, Submit, Div, Reset # type: ignore
from tinymce.widgets import TinyMCE # type: ignore
from .models import Leave
from accounts.models import CustomUser
from widgets.trix import TrixEditor





class LeaveForm(forms.ModelForm):
    reasons = forms.CharField(widget=TrixEditor)
    class Meta:
        model = Leave
        fields = ['user', 'start_date', 'end_date', 'reasons', 'leave_type']
        widgets = {
            'start_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd','class': 'flatpicker'}),
            'end_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd', 'class': 'flatpicker'})
        }
    
    

