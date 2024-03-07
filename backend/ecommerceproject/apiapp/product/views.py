from rest_framework import viewsets
from apiapp.product.models import Category,Vendor,Products,ProductImage,ProductReview,Wishlist,Address,CartOrderItems,CartOrders
from rest_framework.views import APIView
from .serializers import (CategorySerializer,ProductSerializer,VendorSerializer,ProductImageSerializer,ProductReviewSerializer,WishlistSerializer,
         AddressSerializer,CartOrderItemsSerializer,CartOrdersSerializer,OrderSerializer,OrderDetailSerializer)
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics,permissions

from django.http import Http404


# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryListViewSet(viewsets.ModelViewSet):
    
    serializer_class = ProductSerializer 
    

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Products.objects.filter(category=category_id)  
    

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serialized_data = self.serializer_class(queryset, many=True, context={'request': request})
        filtered_data = [{field: item[field] for field in ['title','image','price']} for item in serialized_data.data]
        return Response(filtered_data)

# product views
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer  

    

class FeatureProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.filter(in_stock=True)
    serializer_class = ProductSerializer
   
class ProductImageViewSet(viewsets.ModelViewSet):
    
    serializer_class = ProductImageSerializer 

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return ProductImage.objects.filter(product=product_id)


    
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer     



 
#orders


############################################################################    
class CartItemsViewSet(viewsets.ModelViewSet):
    queryset = CartOrderItems.objects.all()
    serializer_class = CartOrderItemsSerializer  

class OrderItemsView(APIView):
    def get_object(self, pk):
        try:
            return CartOrderItems.objects.get(pk=pk) 
        except:
            raise Http404


    def get (self,request,pk,format=None):
        productData=self.get_object(pk)
        serializers =  CartOrderItemsSerializer(productData)
        return Response(serializers.data)   
    
    def put(self,request,pk,format=None):
        productData=self.get_object(pk)
        serializers = CartOrderItemsSerializer(productData,data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        
        return Response({'message':'error','error':serializers.errors})     

#########################################################################################
class OrderList(generics.ListCreateAPIView):
    queryset =  CartOrders.objects.all() 
    serializer_class = OrderSerializer  

   

class AddtoCartView(viewsets.ModelViewSet):
    queryset =  CartOrders.objects.all() 
    serializer_class = CartOrdersSerializer   




class OrderDetailView(generics.ListAPIView):
    # queryset =  CartOrderItems.objects.all() 
    serializer_class = OrderDetailSerializer    

    def get_queryset(self):
        order_id = self.kwargs['pk']
        order = CartOrders.objects.get(id=order_id)
        order_items = CartOrderItems.objects.filter(order=order)
        return order_items
    
# delete cart 

class cartObjectView(APIView):
    def get_object(self, pk):
        try:
            return CartOrders.objects.get(pk=pk) 
        except:
            raise Http404


    def get (self,request,pk,format=None):
        productData=self.get_object(pk)
        serializers =  CartOrdersSerializer(productData)
        return Response(serializers.data)   
    
    def put(self,request,pk,format=None):
        productData=self.get_object(pk)
        serializers = CartOrdersSerializer(productData,data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        
        return Response({'message':'error','error':serializers.errors}) 

    def delete(self,request,pk,format=None) :
        productData=self.get_object(pk)
        productData.delete()
        return Response('Delete Successfully')