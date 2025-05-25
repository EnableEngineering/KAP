from django.db import models
from django.conf import settings

class Part(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    sku = models.CharField(max_length=50, unique=True)
    supplier = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='supplied_parts',
        limit_choices_to={'user_type': 'SUPPLIER'}
    )
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    min_order_quantity = models.PositiveIntegerField(default=1)
    lead_time_days = models.PositiveIntegerField(help_text="Average lead time in days")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.sku})"

class Warehouse(models.Model):
    name = models.CharField(max_length=255)
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='managed_warehouses',
        limit_choices_to={'user_type': 'WAREHOUSE'}
    )
    address = models.TextField()
    capacity = models.PositiveIntegerField(help_text="Total storage capacity in cubic meters")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Inventory(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE, related_name='inventory_items')
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='inventory_items')
    quantity = models.PositiveIntegerField(default=0)
    reorder_point = models.PositiveIntegerField(help_text="Quantity at which to reorder")
    reorder_quantity = models.PositiveIntegerField(help_text="Quantity to order when reordering")
    last_restock_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['part', 'warehouse']
        verbose_name_plural = 'Inventories'

    def __str__(self):
        return f"{self.part.name} at {self.warehouse.name}"

    @property
    def needs_restock(self):
        return self.quantity <= self.reorder_point

class InventoryTransaction(models.Model):
    class TransactionType(models.TextChoices):
        RECEIVED = 'RECEIVED', 'Received from Supplier'
        SHIPPED = 'SHIPPED', 'Shipped to Company'
        ADJUSTED = 'ADJUSTED', 'Stock Adjustment'
        RETURNED = 'RETURNED', 'Returned to Supplier'

    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TransactionType.choices)
    quantity = models.IntegerField()  # Positive for received, negative for shipped
    reference_number = models.CharField(max_length=50, blank=True)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='inventory_transactions'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.inventory.part.name} ({self.quantity})"

    def save(self, *args, **kwargs):
        # Update inventory quantity
        self.inventory.quantity += self.quantity
        if self.transaction_type == self.TransactionType.RECEIVED:
            self.inventory.last_restock_date = self.created_at
        self.inventory.save()
        super().save(*args, **kwargs)
