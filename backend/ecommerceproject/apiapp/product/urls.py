
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from.views import (CategoryViewSet, ProductViewSet,ProductImageViewSet,ReviewViewSet,OrderList,
    OrderDetailView,CartItemsViewSet,FeatureProductViewSet,CategoryListViewSet,AddtoCartView,cartObjectView,OrderItemsView,OrderProcessView,OrderUpdateView,ReviewEachViewSet,MyorderView,AdressView,AddressUpdateView)

router = DefaultRouter()
router.register(r'categories',CategoryViewSet)

# product urls
router.register(r'products',ProductViewSet )  
router.register(r'review',ReviewViewSet)
router.register(r'frontproduct',FeatureProductViewSet)
router.register(r'processorder',OrderProcessView)


# cart urls

router.register(r'cartitems',CartItemsViewSet)
router.register(r'addtocart',AddtoCartView)

# order
router.register(r'myorder',MyorderView)

# adress
router.register(r'myprofile',AdressView)


app_name = "apiapp.product"



urlpatterns=[
    path('', include(router.urls)),  
    path('catelist/<int:category_id>/', CategoryListViewSet.as_view({'get': 'list', 'post': 'create'}),) ,
    path('images/<int:product_id>/', ProductImageViewSet.as_view({'get': 'list', 'post': 'create'}),) ,
    path('reviewProduct/<int:product_id>/', ReviewEachViewSet.as_view({'get': 'list', 'post': 'create'}),) ,
    path('order/',OrderList.as_view()),
    path('orderdetail/<pk>',OrderDetailView.as_view()),
    path('tocart/<int:pk>/',cartObjectView.as_view()),
    path('toorderdata/<int:pk>/',OrderItemsView.as_view()),
    path('orderupdate/<int:pk>/',OrderUpdateView.as_view()),
    path('addressupdate/<int:pk>/',AddressUpdateView.as_view()),
    
    
]