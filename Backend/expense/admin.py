from django.contrib import admin

from .models import Expense, ExpenseUser

admin.site.register(Expense)
admin.site.register(ExpenseUser)
