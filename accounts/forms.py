from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
from django.contrib.auth.models import Group, Permission
from crispy_forms.helper import FormHelper # type: ignore




class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "eg. John"}),
        help_text= "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        print(self.helper)
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email', 'username',)
    
   



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
        widget=forms.TextInput(attrs={"placeholder": "eg. John"}),
        required=False
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "eg. Doe"}),
        required=False
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={"placeholder": "eg. john.doe@example.com"}),
        required=False
    )
    class Meta:
        model = CustomUser
        exclude = ['last_login', 'user_permissions', 'date_joined', 'username']
        # fields = ('email', 'username',)



class CustomGroupForm(forms.ModelForm):
    permissions = forms.ModelMultipleChoiceField(
        queryset=Permission.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        label="User Permissions",
        required= False
    )
    class Meta:
        model = Group
        fields = ['name', 'permissions']