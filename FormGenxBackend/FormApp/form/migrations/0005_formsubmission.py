# Generated by Django 3.0.5 on 2021-06-04 13:02

from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('creator', '0003_remove_creator_is_deployed'),
        ('form', '0004_formentry_is_deployed'),
    ]

    operations = [
        migrations.CreateModel(
            name='FormSubmission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission', djongo.models.fields.JSONField()),
                ('admin', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='creator.Creator', verbose_name='Admin')),
                ('form_entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form.FormEntry')),
            ],
        ),
    ]
