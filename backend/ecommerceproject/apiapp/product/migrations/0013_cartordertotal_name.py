# Generated by Django 5.0.1 on 2024-03-03 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0012_cartordertotal'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartordertotal',
            name='name',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]