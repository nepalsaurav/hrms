from django import forms
from accounts.models import CustomUser
from crispy_forms.helper import FormHelper # type: ignore
from crispy_forms.layout import Layout, Field, Submit, Div, Reset # type: ignore
from tinymce.widgets import TinyMCE # type: ignore
from .models import Leave
from widgets.trix import TrixEditor
from crispy_forms.helper import FormHelper # type: ignore # type: ignor






class LeaveForm(forms.ModelForm):
    reasons = forms.CharField(widget=TrixEditor)
    user = forms.ModelChoiceField(
        queryset=CustomUser.objects.all()
    )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()

    class Meta:
        model = Leave
        fields = ['user', 'start_date', 'end_date', 'reasons', 'leave_type']
        widgets = {
            'start_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd','class': 'flatpicker'}),
            'end_date': forms.TextInput(attrs={'placeholder': 'yyyy-mm-dd', 'class': 'flatpicker'})
        }
    
    

