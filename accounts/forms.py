from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission

groups = forms.ModelMultipleChoiceField(
        queryset=Group.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Groups",
        required=False,
        help_text="Select all groups that apply to this user.",
        error_messages={"required": "Select at least one group."},
    )

class CustomUserCreationForm(UserCreationForm):
    groups = groups
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):
    groups = groups
    class Meta:
        model = CustomUser
        fields = ('email', 'username',)