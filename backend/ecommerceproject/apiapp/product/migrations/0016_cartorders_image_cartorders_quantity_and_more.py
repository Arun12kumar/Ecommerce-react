# Generated by Django 5.0.1 on 2024-03-06 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0015_alter_cartorderitems_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartorders',
            name='image',
            field=models.ImageField(blank=True, default='cartorder_images.jpg', upload_to='cartorder_images'),
        ),
        migrations.AddField(
            model_name='cartorders',
            name='quantity',
            field=models.IntegerField(default='0'),
        ),
        migrations.AddField(
            model_name='cartorders',
            name='total',
            field=models.DecimalField(blank=True, decimal_places=2, default='100.20', max_digits=999999999999),
        ),
    ]