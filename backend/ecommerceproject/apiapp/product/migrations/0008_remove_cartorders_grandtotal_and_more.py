# Generated by Django 5.0.1 on 2024-03-03 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_remove_cartorderitems_grandtotal_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartorders',
            name='grandtotal',
        ),
        migrations.AddField(
            model_name='cartorderitems',
            name='grandtotal',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=999999999999),
        ),
    ]
