from urllib import request
from django.contrib.contenttypes.models import ContentType
from django.db import models
from accounts.models import CustomUser
from trix.fields import TrixField # type: ignore

# Create your models here.

class LeaveManager(models.Manager):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
    def set_user(self, user):
        self.user = user
    def get_queryset(self) -> models.QuerySet:
       
        if self.user:
           user = CustomUser.objects.get(username=self.user)
           if user.has_perm("leave.can_view_all"):
               return super().get_queryset()
           if user.has_perm("leave.can_view_own_branch"):
               # here implement branch filter
               print(user.__dict__)
               return super().get_queryset().filter(user__branch=self.user.branch)
           if user.has_perm("leave.can_view_own_department"):
                return super().get_queryset().filter(user__department=self.user.department)
           if user.has_perm("leave.can_view_own"):
               return super().get_queryset().filter(user=self.user)
        return super().get_queryset().none()
        
        # return self.model.objects.none()

class Leave(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False)
    start_date = models.DateField(null=False)
    end_date = models.DateField(null=False)
    reasons = models.TextField(null=False)
    leave_type = models.CharField(null=False,max_length=20, choices=[
        ('sick', 'sick'),
        ('casual', 'casual'),
        ('emergency', 'emergency'),
        ('others', 'others')
    ])
    status = models.CharField(null=False, max_length=20, choices=[
        ('pending', 'pending'),
        ('approved', 'approved'),
        ('rejected', 'rejected')
    ], default='pending')
    created = models.DateTimeField(auto_now_add=True)

    @property
    def username(self):
        return self.user.username
    
    @property
    def first_name(self):
        return self.user.first_name
    
    @property
    def last_name(self):
        return self.user.last_name
    
    
    objects = LeaveManager()

    class Meta:
        permissions = [
            ('can_view_all', 'Can View All Data'),
            ('can_view_own_department', 'Can View Own Department Data'),
            ('can_view_own_branch', 'Can View Own Branch Data'),
            ('can_view_own', 'Can View Own Data'),
            ('can_add_all', 'Can Add All Data'),
            ('can_add_own_department', 'Can Add Own Department Data'),
            ('can_add_own_branch', 'Can Add Own Branch Data'),
            ('can_add_own', 'Can Add Own Data'),
            ('can_change_all', 'Can Change All Data'),
            ('can_change_own_department', 'Can Change Own Department Data'),
            ('can_change_own_branch', 'Can Change Own Branch Data'),
            ('can_change_own', 'Can Change Own Data'),
            ('can_delete_all', 'Can Delete All Data'),
            ('can_delete_own_department', 'Can Delete Own Department Data'),
            ('can_delete_own_branch', 'Can Delete Own Branch Data'),
            ('can_delete_own', 'Can Delete Own Data')
        ]

    def __str__(self):
        return self.user.username
    
   