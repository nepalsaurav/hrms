from django.db import models
from accounts.models import CustomUser
from trix.fields import TrixField # type: ignore

# Create your models here.

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
    
   