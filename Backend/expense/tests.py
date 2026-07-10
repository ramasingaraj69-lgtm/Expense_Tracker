from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Expense, ExpenseUser


class ExpenseUserFlowTests(APITestCase):
    def test_register_login_and_user_scoped_expenses(self):
        register_response = self.client.post(
            reverse("register"),
            {"name": "alice", "password": "secret"},
            format="json",
        )

        self.assertEqual(register_response.status_code, 201)
        self.assertTrue(register_response.data["status"])

        login_response = self.client.post(
            reverse("login"),
            {"name": "alice", "password": "secret"},
            format="json",
        )

        self.assertEqual(login_response.status_code, 200)
        self.assertEqual(login_response.data["user"]["name"], "alice")

        user_id = login_response.data["user"]["id"]

        Expense.objects.create(
            title="Coffee",
            amount=3.5,
            description="Morning coffee",
            date="2026-07-09",
            user_id=user_id,
        )
        other_user = ExpenseUser.objects.create(name="bob", password="secret")
        Expense.objects.create(
            title="Dinner",
            amount=12.0,
            description="Other user expense",
            date="2026-07-09",
            user=other_user,
        )

        response = self.client.get(reverse("expenses"), {"user_id": user_id})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["data"][0]["title"], "Coffee")
