# Generated by Django 5.0.1 on 2024-03-06 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0016_cartorders_image_cartorders_quantity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorders',
            name='image',
            field=models.ImageField(blank=True, default='order_images.jpg', upload_to='order_images'),
        ),
    ]