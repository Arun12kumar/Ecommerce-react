from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView
from apiapp import views

app_name = "apiapp"
app_name = "apiapp.product"


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/', views.Registerview.as_view()),
    path('dashboard/', views.dashboard),
    path('test/', views.testEndPoint),
    path('', views.getRoutes),
    path('product/',include('apiapp.product.urls')),
    

]
