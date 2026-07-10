from django.urls import path

from .views import ExpenseAPIView, LoginAPIView, RegisterAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("expenses/", ExpenseAPIView.as_view(), name="expenses"),
    path("expenses/<int:id>/", ExpenseAPIView.as_view(), name="expense"),
]