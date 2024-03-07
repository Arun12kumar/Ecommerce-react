from django.shortcuts import render
from django.http import HttpRequest,JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from apiapp.models import User

import braintree

gateway = braintree.BraintreeGateway(
  braintree.Configuration(
      braintree.Environment.Sandbox,
      merchant_id="k7qtzrv2df8y7bw4",
      public_key="d7bc9hkqqwvvnvv6",
      private_key="f6e38379556bbcb295815c97f78b335a"
  )
)


def validate_user_session(id, token):
    User = get_user_model()

    try:
        user = User.objects.get(pk=id)
        if user.session_token == token:
            return True
    except User.DoesNotExist:
        pass

    return False

@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session'})
    return JsonResponse({'clientToken': gateway.client_token.generate(), 'success': True})   

@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session'})

    nonce_from_the_client = request.POST["paymentMethodNonce"]         
    amount_from_the_client = request.POST["amount"]   

    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "paymentMethodNonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })     

    if result.is_success:
        return JsonResponse({
            "success": result.is_success, 
            "transaction": {'id': result.transaction.id, 'amount': result.transaction.amount}
        })
    else:
        return JsonResponse({'error': True, 'success': False})
