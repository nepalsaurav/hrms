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

    def __str__(self):
        return self.user.username