from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission

class CustomUserCreationForm(UserCreationForm):
    groups = forms.ModelMultipleChoiceField(
        queryset=Group.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Groups",
        help_text="Select all groups that apply to this user.",
        error_messages={"required": "Select at least one group."},
    )
    user_permissions = forms.ModelMultipleChoiceField(
        queryset=Permission.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Permissions",
        help_text="Select all permissions that apply to this user.",
        error_messages={"required": "Select at least one permission."},
    )
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):
    groups = forms.ModelMultipleChoiceField(
        queryset=Group.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Groups",
        help_text="Select all groups that apply to this user.",
        error_messages={"required": "Select at least one group."},
    )
    class Meta:
        model = CustomUser
        fields = ('email', 'username',)