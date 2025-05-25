from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class UserType(models.TextChoices):
        SUPPLIER = 'SUPPLIER', 'Supplier'
        COMPANY = 'COMPANY', 'Company'
        WAREHOUSE = 'WAREHOUSE', 'Warehouse Manager'
    
    user_type = models.CharField(
        max_length=20,
        choices=UserType.choices,
        default=UserType.COMPANY
    )
    company_name = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

    @property
    def is_supplier(self):
        return self.user_type == self.UserType.SUPPLIER

    @property
    def is_company(self):
        return self.user_type == self.UserType.COMPANY

    @property
    def is_warehouse(self):
        return self.user_type == self.UserType.WAREHOUSE
