# serializers.py
from rest_framework import serializers
from apiapp.product.models import Category,Vendor,Products,ProductImage,ProductReview,Wishlist,Address,CartOrderItems,CartOrders,CartOrderTotal,Myorders

# product serializers
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = '__all__'





# cartegory serializers
        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'



class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'



        

# order serializers       
class CartOrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrderItems
        fields = '__all__'       

class CartOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrders
        fields = '__all__'   


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model= CartOrders
        fields = '__all__'

    def __init__(self,*args, **kwargs):
        super(OrderSerializer,self).__init__(*args, **kwargs) 
        self.Meta.depth = 1          

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model= CartOrderItems
        fields = '__all__'

    def __init__(self,*args, **kwargs):
        super(OrderDetailSerializer,self).__init__(*args, **kwargs) 
        self.Meta.depth = 1             

class OrderTotalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrderTotal
        fields = '__all__'  

class MyorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Myorders
        fields = '__all__'          


# Adress      
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'          
           