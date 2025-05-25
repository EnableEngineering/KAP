from django.db import models
from django.conf import settings
from inventory.models import Part, Warehouse
import uuid

class Shipment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        IN_TRANSIT = 'IN_TRANSIT', 'In Transit'
        RECEIVED = 'RECEIVED', 'Received'
        DAMAGED = 'DAMAGED', 'Damaged'

    shipment_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    supplier = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='shipments_sent',
        limit_choices_to={'user_type': 'SUPPLIER'}
    )
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='shipments_received')
    warehouse_manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='shipments_managed',
        limit_choices_to={'user_type': 'WAREHOUSE'}
    )
    shipment_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Shipment {self.shipment_id} to {self.warehouse.name}"

class ShipmentItem(models.Model):
    shipment_item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, related_name='items')
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.part.name} x {self.quantity} in {self.shipment}"

class DispatchPlan(models.Model):
    class Status(models.TextChoices):
        PLANNED = 'PLANNED', 'Planned'
        COMPLETED = 'COMPLETED', 'Completed'

    dispatch_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hgap = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='dispatch_plans',
        limit_choices_to={'user_type': 'COMPANY'}
    )
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    planned_date = models.DateField()
    quantity = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PLANNED)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Dispatch {self.dispatch_id} for {self.part.name} ({self.quantity})"
