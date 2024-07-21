from django.contrib.auth.models import AbstractUser
from django.db import models



class Department(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self) -> str:
        return self.name

class Branch(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self) -> str:
        return self.name

class CustomUser(AbstractUser):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.username
    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'