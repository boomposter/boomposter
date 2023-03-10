# Generated by Django 4.0.2 on 2022-02-28 12:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spaces', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adspace',
            name='price',
            field=models.FloatField(help_text='Rental price of the space per 1 day in RUB.', null=True, validators=[django.core.validators.MinValueValidator(1, 'The rental of the space should be at least 1RUB.')], verbose_name='rental price'),
        ),
    ]
