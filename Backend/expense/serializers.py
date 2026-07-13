from rest_framework import serializers

from .models import Expense, ExpenseUser,Budget

from .models import FinancialGoal

class ExpenseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseUser
        fields = ["id", "name", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "user", "title" ,"amount","category", "description", "date"]

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = "__all__"

class FinancialGoalSerializer(serializers.ModelSerializer):

    class Meta:
        model = FinancialGoal
        fields = "__all__"