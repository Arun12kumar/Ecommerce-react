
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from.views import (CategoryViewSet, ProductViewSet,ProductImageViewSet,ReviewViewSet,OrderList,
    OrderDetailView,CartItemsViewSet,OrderDetail,FeatureProductViewSet,CategoryListViewSet,AddtoCartView)

router = DefaultRouter()
router.register(r'categories',CategoryViewSet)

# product urls
router.register(r'products',ProductViewSet )  
router.register(r'review',ReviewViewSet)
router.register(r'frontproduct',FeatureProductViewSet)


# cart urls
router.register(r'cartlast',CartItemsViewSet)
router.register(r'cartitems',OrderDetail)
router.register(r'addtocart',AddtoCartView)




app_name = "apiapp.product"



urlpatterns=[
    path('', include(router.urls)),  
    path('catelist/<int:category_id>/', CategoryListViewSet.as_view({'get': 'list', 'post': 'create'}),) ,
    path('images/<int:product_id>/', ProductImageViewSet.as_view({'get': 'list', 'post': 'create'}),) ,
    path('order/',OrderList.as_view()),
    path('orderdetail/<pk>',OrderDetailView.as_view()),
   
    
]