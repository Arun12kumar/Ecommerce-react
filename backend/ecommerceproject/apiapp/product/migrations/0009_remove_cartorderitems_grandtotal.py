# Generated by Django 5.0.1 on 2024-03-03 02:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_remove_cartorders_grandtotal_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartorderitems',
            name='grandtotal',
        ),
    ]
