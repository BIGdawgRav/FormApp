# Generated by Django 3.0.5 on 2021-05-24 04:20

from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('creator', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FormEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('form_structure', djongo.models.fields.JSONField()),
                ('admin', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='creator.Creator', verbose_name='Admin')),
            ],
        ),
    ]
