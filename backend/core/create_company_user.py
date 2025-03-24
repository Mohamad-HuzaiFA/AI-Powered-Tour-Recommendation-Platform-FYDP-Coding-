import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tour_recommendation.settings')
django.setup()

from core.models import User

company_user, created = User.objects.get_or_create(
    username="travel_company",
    defaults={
        "email": "travel@company.com",
        "password": "securepassword123",
        "user_type": "company",
        "is_verified": True,
        "company_name": "Amazing Travels",
        "phone_number": "1234567890",
        "website": "https://amazingtravels.com"
    }
)

if created:
    print(f"New company user created with ID: {company_user.id}")
else:
    print(f"User already exists with ID: {company_user.id}")
