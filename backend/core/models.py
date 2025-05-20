import uuid
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.conf import settings
from django.utils import timezone

# ✅ User Model (Tourist & Tourism Company)
class User(AbstractUser):
    USER_TYPES = [
        ('tourist', 'Tourist'),
        ('company', 'Tourism Company'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    profile_info = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # ✅ Fixing ManyToMany conflicts
    groups = models.ManyToManyField(Group, related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)

    # ✅ New Fields
    is_verified = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    website = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

# ✅ Tour Tag Model (New)
class TourTag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)  # e.g., "adventure", "luxury"
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

# ✅ Tour Model (Updated)
class Tour(models.Model):
    # TOUR_TYPE_CHOICES = [
    #     ('party', 'Party'),
    #     ('family', 'Family'),
    #     ('dj_night', 'DJ Night'),
    #     ('classical', 'Classical'),
    # ]
    TOUR_TYPE_CHOICES = [
    ('adventure', 'Adventure'),
    ('cultural', 'Cultural Immersion'),
    ('historical', 'Historical Exploration'),
    ('nature', 'Nature & Wildlife'),
    ('beach', 'Beach Getaway'),
    ('mountain', 'Mountain Expedition'),
    ('city_tour', 'City Sightseeing'),
    ('foodie', 'Food & Culinary'),
    ('luxury', 'Luxury Escape'),
    ('party', 'Party'),
    ('family', 'Family'),
    ('dj_night', 'DJ Night'),
    ('classical', 'Classical'),
]
    
    SEASON_CHOICES = [
        ('summer', 'Summer'),
        ('winter', 'Winter'),
        ('monsoon', 'Monsoon'),
        ('spring', 'Spring'), 
    ]
    
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price_per_person = models.DecimalField(max_digits=10, decimal_places=2)  # Updated field
    duration = models.IntegerField(help_text="Duration in days", null=True, blank=True)
    location = models.CharField(max_length=255)
    company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="company_tours")
    main_image = models.ImageField(upload_to="tours/main_images/")
    availability = models.IntegerField(help_text="Available spots" , null=True, blank=True)
    min_group_size = models.IntegerField(default=1)  # New field
    max_group_size = models.IntegerField(default=10)  # New field
    tour_type = models.CharField(max_length=20, choices=TOUR_TYPE_CHOICES, null=True, blank=True)  # New field
    tags = models.ManyToManyField(TourTag, related_name="tours", blank=True)  # New field
    ai_keywords = models.JSONField(default=list)  # For storing processed keywords
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    # start_date = models.DateField()
    # ... other fields ...

    def save(self, *args, **kwargs):
        if not self.latitude or not self.longitude:
            from .pricing_utils import get_lat_lon_from_weather
            lat, lon = get_lat_lon_from_weather(self.location)
            self.latitude = lat
            self.longitude = lon
        super().save(*args, **kwargs)
    
    season = models.CharField(max_length=10, choices=SEASON_CHOICES, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.company.username}"

# ✅ Company Profile Model (New)
class CompanyProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="company_profile")
    description = models.TextField()
    established_year = models.IntegerField(null=True, blank=True)
    average_rating = models.FloatField(default=0.0)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile for {self.user.company_name}"

# ✅ User Tour Preference Model (New)
class UserTourPreference(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tour_preferences")
    budget_min = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    budget_max = models.DecimalField(max_digits=10, decimal_places=2, default=10000)
    preferred_tour_types = models.JSONField(default=list)  # ["party", "family"]
    preferred_locations = models.JSONField(default=list)   # ["France", "Dubai"]
    group_size = models.IntegerField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Preferences for {self.user.username}"

# ✅ Tour Image Model
class TourImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="gallery")
    image = models.ImageField(upload_to="tours/gallery/")
    # created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.tour.title}"
    
class TourGallery(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="gallery_images")
    image = models.ImageField(upload_to="tours/gallery_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)    

# ✅ Booking Model
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="bookings")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    booking_date = models.DateTimeField(auto_now_add=True)
    number_of_people = models.IntegerField(default=1)  # New field

    def __str__(self):
        return f"Booking by {self.user.email} for {self.tour.title}"












































# # ✅ Payment Model
# class Payment(models.Model):
#     METHOD_CHOICES = [
# ('easypaisa', 'Easypaisa'),
# ('jazzcash', 'JazzCash'),
# ('bank_transfer', 'Bank Transfer'),
# ('cash', 'Cash'),
#     ]
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('successful', 'Successful'),
#         ('failed', 'Failed'),
#     ]
    
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")
#     amount = models.FloatField()
#     method = models.CharField(max_length=20, choices=METHOD_CHOICES)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Payment {self.id} - {self.status}"










# class Payment(models.Model):
    
#     METHOD_CHOICES = [
# ('easypaisa', 'Easypaisa'),
# ('jazzcash', 'JazzCash'),
# ('bank_transfer', 'Bank Transfer'),
# ('cash', 'Cash'),
#     ]
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('successful', 'Successful'),
#         ('failed', 'Failed'),
#     ]
    
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")
#     amount = models.FloatField()
#     method = models.CharField(max_length=20, choices=METHOD_CHOICES)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Payment {self.id} - {self.status}"

#     receipt_image   = models.ImageField(upload_to="payments/receipts/",
#                                         null=True, blank=True)
#     transaction_id  = models.CharField(max_length=100, null=True, blank=True)

#     verified_by     = models.ForeignKey(
#         User, null=True, blank=True,
#         on_delete=models.SET_NULL, related_name="verified_payments"
#     )
#     verified_at     = models.DateTimeField(null=True, blank=True)

#     # Optional: simple commission tracking
#     platform_commission = models.FloatField(default=0.0)
#     amount_to_company   = models.FloatField(default=0.0)

#     def mark_verified(self, admin_user: "User", commission_pct: float = 0.10):
#         """Utility called by admin view/service."""
#         self.status       = "successful"
#         self.verified_by  = admin_user
#         self.verified_at  = timezone.now()
#         self.platform_commission = round(self.amount * commission_pct, 2)
#         self.amount_to_company   = round(self.amount - self.platform_commission, 2)
#         self.save()

#         # sync booking status
#         self.booking.status = "confirmed"
#         self.booking.save()

#         # fire notification helpers (simple example)
#         Notification.objects.create(
#             user=self.booking.user,
#             message=f"Your payment for booking {self.booking.id} is verified!"
#         )
#         Notification.objects.create(
#             user=self.booking.tour.company,
#             message=f"Payment confirmed for booking {self.booking.id}. "
#                     f"You will receive Rs. {self.amount_to_company}"
#         )








# tours/models.py

import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone


class Payment(models.Model):
    METHOD_CHOICES = [
        ('easypaisa', 'Easypaisa'),
        ('jazzcash', 'JazzCash'),
        ('bank_transfer', 'Bank Transfer'),
        ('cash', 'Cash'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.OneToOneField("Booking", on_delete=models.CASCADE, related_name="payment")

    amount = models.FloatField()
    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    # ✅ NEW FIELDS for manual receipt upload
    receipt_image = models.ImageField(upload_to='payments/receipts/', null=True, blank=True)
    transaction_id = models.CharField(max_length=100, null=True, blank=True)

    # ✅ Admin verification fields
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="verified_payments"
    )
    verified_at = models.DateTimeField(null=True, blank=True)

    # ✅ Optional commission tracking
    platform_commission = models.FloatField(default=0.0)
    amount_to_company = models.FloatField(default=0.0)

    def __str__(self):
        return f"Payment {self.id} - {self.status}"

    def mark_verified(self, admin_user: "User", commission_pct: float = 0.10):
        """
        Call this from admin or view to mark payment verified and calculate commission.
        """
        self.status = "successful"
        self.verified_by = admin_user
        self.verified_at = timezone.now()
        self.platform_commission = round(self.amount * commission_pct, 2)
        self.amount_to_company = round(self.amount - self.platform_commission, 2)
        self.save()

        # Sync booking status to confirmed
        self.booking.status = "confirmed"
        self.booking.save()

        # Send notifications to user and company (simple example)
        from .models import Notification
        Notification.objects.create(
            user=self.booking.user,
            message=f"Your payment for booking {self.booking.id} is verified!"
        )
        Notification.objects.create(
            user=self.booking.tour.company,
            message=f"Payment confirmed for booking {self.booking.id}. "
                    f"You will receive Rs. {self.amount_to_company}"
        )















































# ✅ Review Model (Updated)
class Review(models.Model):
    REVIEW_TYPE_CHOICES = [
        ('tour', 'Tour'),
        ('company', 'Company'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="reviews", null=True, blank=True)
    company = models.ForeignKey(User, on_delete=models.CASCADE, related_name="company_reviews", null=True, blank=True)
    rating = models.IntegerField()
    comment = models.TextField()
    review_type = models.CharField(max_length=10, choices=REVIEW_TYPE_CHOICES, default='tour')  # New field
    would_recommend = models.BooleanField(default=True)  # New field
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.username} - {self.rating} stars"

# ✅ Notification Model
class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    status = models.CharField(max_length=10, choices=[('unread', 'Unread'), ('read', 'Read')], default='unread')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}"