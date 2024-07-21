from typing import Any
from django import forms
from accounts.models import CustomUser
from crispy_forms.helper import FormHelper # type: ignore
from crispy_forms.layout import Layout, Field, Submit, Div, Reset # type: ignore
from tinymce.widgets import TinyMCE # type: ignore
from .models import Leave
from widgets.trix import TrixEditor
from crispy_forms.helper import FormHelper # type: ignore # type: ignor
from django_select2 import forms as s2forms # type: ignore




class UserWidget(s2forms.ModelSelect2Widget):
    search_fields  = [
        'username__icontains'
    ]





class LeaveForm(forms.ModelForm):
    user = forms.ModelChoiceField(
        queryset=CustomUser.objects.all(),
        widget=forms.Select(),
    )
    reasons = forms.CharField(widget=TrixEditor)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)
        
        if self.instance and self.instance.pk:
            self.fields['user'] = None
            self.fields['user'] = forms.CharField(
                widget=forms.TextInput(attrs={'readonly': True}),
            )
            
        self.helper = FormHelper()

    def get_initial_for_field(self, field: forms.Field, field_name: str) -> Any:
        if field_name == 'user':
            if self.instance and self.instance.pk:
                return self.instance.user
                
        return super().get_initial_for_field(field, field_name)
    
      
    class Meta:
        model = Leave
        fields = ['user', 'start_date', 'end_date', 'reasons', 'leave_type']
        widgets = {
            'start_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd', 'class': 'flatpicker'}),
            'end_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd', 'class': 'flatpicker'}),
        }

    def clean_user(self):
        # Ensure that the user field remains unchanged in edit mode
        if self.instance and self.instance.pk:
            return self.instance.user
        else:
            return self.cleaned_data['user']
