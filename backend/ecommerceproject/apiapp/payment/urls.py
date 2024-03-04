# urls.py
from django.urls import path
from .views import CheckOutAPIView, PaymentSuccessfulAPIView, PaymentFailedAPIView

app_name = "apiapp.payment"

urlpatterns = [
    path('checkout/<int:product_id>/', CheckOutAPIView.as_view(), name='checkout'),
    path('payment-success/<int:product_id>/', PaymentSuccessfulAPIView.as_view(), name='payment-success'),
    path('payment-failed/<int:product_id>/', PaymentFailedAPIView.as_view(), name='payment-failed'),
]
