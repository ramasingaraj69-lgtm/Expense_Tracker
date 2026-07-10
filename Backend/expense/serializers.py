from rest_framework import serializers

from .models import Expense, ExpenseUser


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
        fields = ["id", "user", "title", "amount", "description", "date"]