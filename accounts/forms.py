from typing import Any
from attr import field
from django import forms
from django.contrib.admin.helpers import Fieldset
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import Group, Permission
from crispy_forms.helper import FormHelper
from .models import Branch, CustomUser, Department

class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "e.g., John"}),
        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email', 'username', 'department', 'branch',)

class CustomUserChangeForm(UserChangeForm):
    groups = forms.ModelMultipleChoiceField(
        queryset=Group.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Groups",
        required=False,
        help_text="Select all groups that apply to this user.",
        error_messages={"required": "Select at least one group."},
    )
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "e.g., John"}),
        required=False
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "e.g., Doe"}),
        required=False
    )
    department = forms.ModelChoiceField(
        queryset=Department.objects.all(),
        widget=forms.Select()
    )
    branch = forms.ModelChoiceField(
        queryset=Branch.objects.all(),
        widget=forms.Select()
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={"placeholder": "e.g., john.doe@example.com"}),
        required=False
    )
   

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)

    class Meta:
        model = CustomUser
        exclude = ['last_login', 'user_permissions', 'date_joined']

class CustomGroupForm(forms.ModelForm):
    name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "group name"}),
    )
    permissions = forms.ModelMultipleChoiceField(
        queryset=Permission.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Permissions",
        required=False
    )

    class Meta:
        model = Group
        fields = ['name', 'permissions']