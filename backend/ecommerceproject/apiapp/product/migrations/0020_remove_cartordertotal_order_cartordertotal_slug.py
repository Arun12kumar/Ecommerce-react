# Generated by Django 5.0.1 on 2024-03-08 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0019_remove_cartorderitems_final_amount_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartordertotal',
            name='order',
        ),
        migrations.AddField(
            model_name='cartordertotal',
            name='slug',
            field=models.SlugField(default='sd3454', unique=True),
        ),
    ]