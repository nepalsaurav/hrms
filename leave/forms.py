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
        super().__init__(*args, **kwargs)
        self.request = kwargs.pop('request', None)
        self.helper = FormHelper()
      
    class Meta:
        model = Leave
        fields = ['user', 'start_date', 'end_date', 'reasons', 'leave_type']
        widgets = {
            'start_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd', 'class': 'flatpicker'}),
            'end_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd', 'class': 'flatpicker'}),
        }

