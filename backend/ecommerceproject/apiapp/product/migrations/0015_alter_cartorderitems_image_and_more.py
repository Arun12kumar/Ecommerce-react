# Generated by Django 5.0.1 on 2024-03-06 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0014_alter_cartorderitems_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorderitems',
            name='image',
            field=models.ImageField(blank=True, default='cartorder_images.jpg', upload_to='cartorder_images'),
        ),
        migrations.AlterField(
            model_name='cartorderitems',
            name='invoi_no',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='cartorderitems',
            name='item',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='cartorderitems',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, default='100.20', max_digits=999999999999),
        ),
        migrations.AlterField(
            model_name='cartorderitems',
            name='product_status',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='cartorderitems',
            name='total',
            field=models.DecimalField(blank=True, decimal_places=2, default='100.20', max_digits=999999999999),
        ),
    ]
