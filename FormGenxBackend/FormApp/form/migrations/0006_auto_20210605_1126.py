# Generated by Django 3.0.5 on 2021-06-05 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('creator', '0003_remove_creator_is_deployed'),
        ('form', '0005_formsubmission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formsubmission',
            name='admin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='creator.Creator', verbose_name='Admin'),
        ),
    ]
