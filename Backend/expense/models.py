from django.db import models
from django.utils import timezone


class ExpenseUser(models.Model):
    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Expense(models.Model):
    user = models.ForeignKey(
        ExpenseUser,
        related_name="expenses",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=100)
    amount = models.FloatField()
    description = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title