# Generated by Django 5.1.7 on 2025-03-15 14:47

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_tourpackage_company_tour_tourimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='TourGallery',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='tours/gallery_images/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('tour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery_images', to='core.tour')),
            ],
        ),
    ]
