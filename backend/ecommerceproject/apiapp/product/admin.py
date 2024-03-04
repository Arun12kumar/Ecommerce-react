from django.contrib import admin
from apiapp.product.models import Category,Vendor,Products,ProductImage,ProductReview,Wishlist,Address,CartOrderItems,CartOrders,CartOrderTotal

# Register your models here.

class ProductImageAdmin(admin.TabularInline):
    model = ProductImage

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]  
    list_display = ['user','title','product_image','price','feature','product_status']

class CategoryAdmin(admin.ModelAdmin):  
    list_display = ['title','category_image']    

class ProductDetailAdmin(admin.ModelAdmin):  
    list_display = ['product','date']  


class VenderAdmin(admin.ModelAdmin):  
    list_display = ['title','vendor_image']   

class CartorderAdmin(admin.ModelAdmin):  
    list_display = ['user','price','order_date','paid_status']  

class CartorderItemAdmin(admin.ModelAdmin):  
    list_display = ['total','quantity','order','item','price']  

class ProductReviewAdmin(admin.ModelAdmin):  
    list_display = ['user','product','review','rating']


class WishlistAdmin(admin.ModelAdmin):  
    list_display = ['user','product','date']    


class AddressAdmin(admin.ModelAdmin):  
    list_display = ['user','address','status']  

class CartOrderTotalAdmin(admin.ModelAdmin):  
    list_display = ['total_amount','name']  

admin.site.register(Products,ProductAdmin)  
admin.site.register(ProductImage)  
  

admin.site.register(Category,CategoryAdmin)      
admin.site.register(Vendor,VenderAdmin)         
admin.site.register(CartOrders,CartorderAdmin)         
admin.site.register(CartOrderItems,CartorderItemAdmin)         
admin.site.register(ProductReview,ProductReviewAdmin)      
admin.site.register(Wishlist,WishlistAdmin)      
admin.site.register(Address,AddressAdmin) 

admin.site.register(CartOrderTotal,CartOrderTotalAdmin)      
    