# Generated by Django 5.0.1 on 2024-03-03 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0009_remove_cartorderitems_grandtotal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorderitems',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=999999999999),
        ),
        migrations.AlterField(
            model_name='cartorderitems',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=999999999999),
        ),
    ]