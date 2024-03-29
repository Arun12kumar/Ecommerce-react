# Generated by Django 5.0.1 on 2024-03-01 09:10

import apiapp.product.models
import django.db.models.deletion
import shortuuid.django_fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=30, prefix='cat', unique=True)),
                ('title', models.CharField(default='Gamming console', max_length=100)),
                ('image', models.ImageField(default='category.jpg', upload_to='category')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=256, null=True)),
                ('status', models.BooleanField(default=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Address',
            },
        ),
        migrations.CreateModel(
            name='CartOrders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, default='100.20', max_digits=999999999999)),
                ('status', models.BooleanField(default=True)),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('paid_status', models.CharField(choices=[('processing', 'processing'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')], default='processing', max_length=30)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Cart Order',
            },
        ),
        migrations.CreateModel(
            name='CartOrderItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_status', models.CharField(max_length=200)),
                ('invoi_no', models.CharField(max_length=200)),
                ('item', models.CharField(max_length=200)),
                ('quantity', models.IntegerField(default='0')),
                ('image', models.ImageField(default='cartorder_images.jpg', upload_to='cartorder_images')),
                ('price', models.DecimalField(decimal_places=2, default='100.20', max_digits=999999999999)),
                ('total', models.DecimalField(decimal_places=2, default='100.20', max_digits=999999999999)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.cartorders')),
            ],
            options={
                'verbose_name_plural': 'Cart Order Item',
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=30, prefix='', unique=True)),
                ('title', models.CharField(default='ps5', max_length=100)),
                ('image', models.ImageField(default='product.jpg', upload_to=apiapp.product.models.user_directory_path)),
                ('description', models.TextField(blank=True, default='Products of gamming console', null=True)),
                ('price', models.DecimalField(decimal_places=2, default='100.20', max_digits=999999999999)),
                ('old_price', models.DecimalField(decimal_places=2, default='150.20', max_digits=999999999999)),
                ('specification', models.TextField(blank=True, null=True)),
                ('product_status', models.CharField(choices=[('Draft', 'Draft'), ('disable', 'disable'), ('rejected', 'rejected'), ('in-review', 'in-review'), ('published', 'published')], default='in-review', max_length=30)),
                ('status', models.BooleanField(default=True)),
                ('in_stock', models.BooleanField(default=True)),
                ('feature', models.BooleanField(default=True)),
                ('digital', models.BooleanField(default=True)),
                ('sku', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=30, prefix='sku', unique=True)),
                ('updated', models.DateTimeField(blank=True, null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.category')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Products',
            },
        ),
        migrations.CreateModel(
            name='ProductReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review', models.TextField()),
                ('rating', models.CharField(choices=[('1', '★☆☆☆☆'), ('2', '★★☆☆☆'), ('3', '★★★☆☆'), ('4', '★★★★☆'), ('5', '★★★★★')], default='1', max_length=1)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.products')),
            ],
            options={
                'verbose_name_plural': 'Product Review',
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='product.jpg', upload_to='product_img')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('product_name', models.CharField(blank=True, max_length=80)),
                ('slug', models.SlugField(default='sd3454', unique=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.products')),
            ],
            options={
                'verbose_name_plural': 'Products images',
            },
        ),
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=30, prefix='ven', unique=True)),
                ('title', models.CharField(default='arun', max_length=100)),
                ('image', models.ImageField(default='vendor.jpg', upload_to=apiapp.product.models.user_directory_path)),
                ('description', models.TextField(blank=True, default='vendor of Arun', null=True)),
                ('address', models.CharField(default='123 Main Street', max_length=200)),
                ('contact', models.CharField(default='6282717263', max_length=200)),
                ('chat_resp_time', models.CharField(default='100', max_length=100)),
                ('shop_on_time', models.CharField(default='100', max_length=100)),
                ('auth_rating', models.CharField(default='100', max_length=100)),
                ('days_return', models.CharField(default='100', max_length=100)),
                ('warrenty_period', models.CharField(default='100', max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Vendor',
            },
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.products')),
                ('productbrand', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.productimage')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Wishlist',
            },
        ),
    ]
