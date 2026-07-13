from django.db import models
from django.utils import timezone


class ExpenseUser(models.Model):
    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Expense(models.Model):

    CATEGORY_CHOICES = [
        ("Food", "Food"),
        ("Travel", "Travel"),
        ("Shopping", "Shopping"),
        ("Bills", "Bills"),
        ("Health", "Health"),
        ("Education", "Education"),
        ("Entertainment", "Entertainment"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(
        ExpenseUser,
        related_name="expenses",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    title = models.CharField(max_length=100)

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        default="Other"
    )

    amount = models.FloatField()

    description = models.TextField()

    date = models.DateField()

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Budget(models.Model):

    user = models.ForeignKey(
        ExpenseUser,
        related_name="budgets",
        on_delete=models.CASCADE
    )

    category = models.CharField(
        max_length=30,
        choices=Expense.CATEGORY_CHOICES
    )

    budget = models.FloatField()

    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("user", "category")

    def __str__(self):
        return f"{self.user.name} - {self.category}"

class FinancialGoal(models.Model):

    user = models.OneToOneField(
        ExpenseUser,
        related_name="financial_goal",
        on_delete=models.CASCADE
    )

    monthly_income = models.FloatField()

    monthly_saving_goal = models.FloatField()

    yearly_saving_goal = models.FloatField()

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user.name