# Generated by Django 5.0.1 on 2024-03-10 04:38

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0025_alter_cartordertotal_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartordertotal',
            name='payment_date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
