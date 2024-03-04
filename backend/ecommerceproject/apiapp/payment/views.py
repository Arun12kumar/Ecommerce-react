# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apiapp.product.models import Products
from .serializers import ProductSerializer
from paypal.standard.forms import PayPalPaymentsForm
from django.conf import settings
import uuid
from django.urls import reverse
from django.shortcuts import get_object_or_404

class CheckOutAPIView(APIView):
    def get(self, request, product_id):
        product = get_object_or_404(Products, id=product_id)
        serializer = ProductSerializer(product)
        return Response({'product': serializer.data})

    def post(self, request, product_id):
        product = get_object_or_404(Products, id=product_id)

        host = request.get_host()

        paypal_checkout = {
            'business': settings.PAYPAL_RECEIVER_EMAIL,
            'amount': str(product.price),  # Make sure to convert Decimal to string
            'item_name': product.title,
            'invoice': uuid.uuid4(),
            'currency_code': 'USD',
            'notify_url': f"http://{host}{reverse('paypal-ipn')}",
            'return_url': f"http://{host}{reverse('payment-success', kwargs={'product_id': product.id})}",
            'cancel_url': f"http://{host}{reverse('payment-failed', kwargs={'product_id': product.id})}",
        }

        paypal_payment = PayPalPaymentsForm(initial=paypal_checkout)

        return Response({'product': ProductSerializer(product).data, 'paypal': str(paypal_payment)})
    

class PaymentSuccessfulAPIView(APIView):
    def get(self, request, product_id):
        product = get_object_or_404(Products, id=product_id)
        serializer = ProductSerializer(product)
        return Response({'product': serializer.data, 'message': 'Payment successful'})

class PaymentFailedAPIView(APIView):
    def get(self, request, product_id):
        product = get_object_or_404(Products, id=product_id)
        serializer = ProductSerializer(product)
        return Response({'product': serializer.data, 'message': 'Payment failed'})    
