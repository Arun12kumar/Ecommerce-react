# Generated by Django 5.0.1 on 2024-03-13 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0029_alter_myorders_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='first_name',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='address',
            name='last_name',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='address',
            name='phone',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]