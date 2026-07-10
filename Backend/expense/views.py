from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Expense, ExpenseUser
from .serializers import ExpenseSerializer, ExpenseUserSerializer


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ExpenseUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": True,
                    "message": "User Registered Successfully",
                    "user": {
                        "id": serializer.instance.id,
                        "name": serializer.instance.name,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "status": False,
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get("name", "").strip()
        password = request.data.get("password", "")

        user = ExpenseUser.objects.filter(name=name, password=password).first()

        if user:
            return Response(
                {
                    "status": True,
                    "message": "Login Successful",
                    "user": {
                        "id": user.id,
                        "name": user.name,
                    },
                }
            )

        return Response(
            {
                "status": False,
                "message": "Invalid Name or Password",
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )


class ExpenseAPIView(APIView):

    def get(self, request, id=None):
        user_id = request.query_params.get("user_id")

        if id:
            queryset = Expense.objects.all()
            if user_id:
                queryset = queryset.filter(user_id=user_id)

            try:
                expense = queryset.get(pk=id)
            except Expense.DoesNotExist:
                return Response(
                    {"status": False, "message": "Expense not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            serializer = ExpenseSerializer(expense)
            return Response({"status": True, "data": serializer.data})

        expenses = Expense.objects.all().order_by("-id")
        if user_id:
            expenses = expenses.filter(user_id=user_id)

        serializer = ExpenseSerializer(expenses, many=True)
        return Response(
            {
                "status": True,
                "count": expenses.count(),
                "data": serializer.data,
            }
        )

    def post(self, request):
        data = request.data.copy()
        user_id = data.get("user_id") or data.get("user")
        if not user_id:
            return Response(
                {"status": False, "message": "A user is required to create an expense"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data["user"] = user_id
        serializer = ExpenseSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": True,
                    "message": "Expense Added Successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"status": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def put(self, request, id):
        try:
            expense = Expense.objects.get(pk=id)
        except Expense.DoesNotExist:
            return Response(
                {"status": False, "message": "Expense not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = request.data.copy()
        user_id = data.get("user_id") or data.get("user")
        if user_id:
            data["user"] = user_id

        serializer = ExpenseSerializer(expense, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": True,
                    "message": "Expense Updated",
                    "data": serializer.data,
                }
            )

        return Response(
            {"status": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, id):
        try:
            expense = Expense.objects.get(pk=id)
        except Expense.DoesNotExist:
            return Response(
                {"status": False, "message": "Expense not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        expense.delete()
        return Response({"status": True, "message": "Expense Deleted Successfully"})