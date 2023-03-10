# Generated by Django 4.0.2 on 2022-03-06 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spaces', '0004_adspace_latitude_adspace_longitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adspace',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, help_text='Latitude in format ##.######', max_digits=8, null=True, verbose_name='latitude'),
        ),
        migrations.AlterField(
            model_name='adspace',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, help_text='Longitude in format ###.######', max_digits=9, null=True, verbose_name='longitude'),
        ),
    ]
