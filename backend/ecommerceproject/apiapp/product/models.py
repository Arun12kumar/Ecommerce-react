from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe
from apiapp.models import User
import shortuuid
from django.utils.text import slugify 
from django_ckeditor_5.fields import CKEditor5Field 
from django.db.models import Sum
from decimal import Decimal

# Create your models here.
STATUS_CHOICES = (
    ('processing', 'processing'),
    ('Shipped', 'Shipped'),
    ('Delivered', 'Delivered'),
)

STATUS = (
    ('Draft', 'Draft'),
    ('disable', 'disable'),
    ('rejected', 'rejected'),
    ('in-review', 'in-review'),
    ('published', 'published'),
)

RATING = (
    ('1', '★☆☆☆☆'),
    ('2', '★★☆☆☆'),
    ('3', '★★★☆☆'),
    ('4', '★★★★☆'),
    ('5', '★★★★★'),
)


def user_directory_path(instance, filename):
    return f'user_{instance.user.id}/{filename}'


class Category(models.Model):
    cid = ShortUUIDField(unique=True, length=10, max_length=30, prefix="cat", alphabet="abcdefgh12345")
    title = models.CharField(max_length=100,default="Gamming console")
    image= models.ImageField(upload_to='category',default="category.jpg")

    class Meta:
        verbose_name_plural = "Categories"

    def category_image(self):
        return mark_safe('<img src="%s" width="50" height="50" />'    % (self.image.url))
    
    def  __str__(self):
        return self.title
    


class Vendor(models.Model):
    vid = ShortUUIDField(unique=True, length=10, max_length=30, prefix="ven", alphabet="abcdefgh12345")  
    title = models.CharField(max_length=100,default="arun")
    image= models.ImageField(upload_to= user_directory_path, default="vendor.jpg")  
    description = models.TextField(null=True, blank=True,default="vendor of Arun")

    address = models.CharField(max_length=200, default="123 Main Street")
    contact = models.CharField(max_length=200, default="6282717263")
    chat_resp_time = models.CharField(max_length=100, default="100")
    shop_on_time = models.CharField(max_length=100, default="100")
    auth_rating = models.CharField(max_length=100, default="100")
    days_return = models.CharField(max_length=100, default="100")
    warrenty_period = models.CharField(max_length=100, default="100")

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Vendor"

    def vendor_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' % (self.image.url))
    
    def  __str__(self):
        return self.title
    
 

class Products(models.Model):
    paid = ShortUUIDField(unique=True, length=10, max_length=30, alphabet="abcdefgh12345") 
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
   

    title = models.CharField(max_length=100,default="ps5")
    image= models.ImageField(upload_to= user_directory_path, default="product.jpg")  
    description = CKEditor5Field(null=True, blank=True,default="Products of gamming console",config_name="extends")

    price = models.DecimalField(max_digits=999999999999, decimal_places=2, default="100.20")
    old_price = models.DecimalField(max_digits=999999999999, decimal_places=2, default="150.20")

    specification = CKEditor5Field(null=True,blank=True)
    product_status = models.CharField(choices=STATUS, max_length=30, default="in-review")

    status = models.BooleanField(default=True)
    in_stock = models.BooleanField(default=True)
    feature = models.BooleanField(default=True)
    digital = models.BooleanField(default=True)

    sku = ShortUUIDField(unique=True, length=10, max_length=30, prefix="sku" ,alphabet="abcdefgh12345") 
    updated = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Products"

    def product_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' % (self.image.url))
    
    def  __str__(self):
        return self.title
    
    def get_percentage(self):
        new_price = (self.price/ self.old_price)*100
        return new_price
    
class ProductImage(models.Model):
    image= models.ImageField(upload_to='product_img',default="product.jpg")
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True)  
    date = models.DateTimeField(auto_now_add=True)
    product_name = models.CharField(max_length=80,blank=True)
    slug = models.SlugField(unique=True,default='sd3454')


    class Meta:
        verbose_name_plural = "Products images"

    def  __str__(self):
        return self.product_name
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            uuid_key = shortuuid.uuid()
            uniquied = uuid_key[:4]
            self.slug = slugify(self.product_name) + '-' + str(uniquied.lower())

        super(ProductImage, self).save(*args, **kwargs) 






################################################# Cart ####################################################  

class CartOrders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=999999999999, decimal_places=2, default="100.20")  
    status = models.BooleanField(default=True)   
    order_date = models.DateTimeField(auto_now_add=True) 
    paid_status = models.CharField(choices=STATUS_CHOICES, max_length=30, default="processing")  
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True)
    order_name = models.CharField(max_length=80,blank=True)     

    class Meta:
        verbose_name_plural = "Cart Order"

    def  __str__(self):
        return self.order_name


class CartOrderItems(models.Model):
    order = models.OneToOneField(CartOrders, on_delete=models.CASCADE)
    product_status = models.CharField(max_length=200) 
    invoi_no = models.CharField(max_length=200)
    item = models.CharField(max_length=200)
    quantity = models.IntegerField(default="0")
    image = models.ImageField(upload_to= 'cartorder_images', default="cartorder_images.jpg") 
    price = models.DecimalField(max_digits=999999999999, decimal_places=2, default="100.20")  
    total = models.DecimalField(max_digits=999999999999, decimal_places=2, default="100.20")  

    class Meta:
        verbose_name_plural = "Cart Order Item"

    def order_image(self):
        return mark_safe('<img src="/media/%s" width="50" height="50" />' % (self.image))
    

    
    def save(self, *args, **kwargs):
        # Set the price from the associated CartOrder instance
        self.price = self.order.price

        # Calculate total price before saving
        self.total = self.quantity * self.price

        super().save(*args, **kwargs)   

class CartOrderTotal(models.Model):
    order = models.OneToOneField(CartOrders, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal('0.00'))
    name = models.CharField(max_length=200, blank=True)


    class Meta:
        verbose_name_plural = "Cart Order Total"

    def save(self, *args, **kwargs):
        # Calculate the total amount based on the related CartOrderItems
        total_amount = CartOrderItems.objects.filter(order=self.order).aggregate(Sum('total'))['total__sum']
        self.total_amount = total_amount if total_amount else Decimal('0.00')

        super().save(*args, **kwargs)



############################################# wishlist #######################################################################
class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True)  
    review = models.TextField()
    rating = models.CharField(max_length=1, choices=RATING, default='1')
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Product Review"



    
    def get_rating(self):  
        return self.rating
    

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True) 
    productbrand = models.ForeignKey(ProductImage, on_delete=models.SET_NULL, null=True) 
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Wishlist"


    def  __str__(self):
        return self.product.title
    
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  
    address= models.CharField(max_length=256,null=True)
    status = models.BooleanField(default=False) 

    class Meta:
        verbose_name_plural = "Address"
