# Generated by Django 5.0.1 on 2024-03-02 04:54

import django_ckeditor_5.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_alter_products_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='specification',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, null=True),
        ),
    ]
