# Generated by Django 5.2 on 2025-05-05 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_review_tour_alter_booking_tour_tour_season_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tour',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tour',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
