# Generated by Django 5.0.1 on 2024-03-07 01:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0002_user_session_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='session_token',
        ),
    ]
