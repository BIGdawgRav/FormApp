# Generated by Django 3.0.5 on 2021-06-01 04:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('creator', '0002_creator_is_deployed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='creator',
            name='is_deployed',
        ),
    ]
