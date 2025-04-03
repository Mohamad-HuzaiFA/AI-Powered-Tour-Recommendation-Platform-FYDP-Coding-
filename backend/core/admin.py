from django.contrib import admin
from .models import (
    User,
    Tour,
    TourImage,
    TourGallery,
    TourPackage,
    Booking,
    Payment,
    Review,
    Notification
)

# ✅ Registering Models in the Admin Site

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type', 'is_verified', 'created_at')
    search_fields = ('username', 'email')
    list_filter = ('user_type', 'is_verified', 'created_at')

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'price', 'availability', 'company', 'created_at')
    search_fields = ('title', 'location')
    list_filter = ('created_at', 'location', 'company')

@admin.register(TourImage)
class TourImageAdmin(admin.ModelAdmin):
    list_display = ('tour', 'id')
    search_fields = ('tour__title',)

@admin.register(TourGallery)
class TourGalleryAdmin(admin.ModelAdmin):
    list_display = ('tour', 'id', 'uploaded_at')
    search_fields = ('tour__title',)

@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'availability', 'season', 'location', 'company', 'created_at')
    search_fields = ('title', 'location', 'company__username')
    list_filter = ('season', 'company', 'created_at')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'tour', 'status', 'booking_date')
    search_fields = ('user__email', 'tour__title')
    list_filter = ('status', 'booking_date')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'booking', 'amount', 'method', 'status', 'created_at')
    search_fields = ('booking__user__email', 'booking__tour__title')
    list_filter = ('method', 'status', 'created_at')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'tour', 'rating','created_at')
    search_fields = ('user__username', 'tour__title')
    list_filter = ('rating','created_at')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'status', 'created_at')
    search_fields = ('user__username', 'message')
    list_filter = ('status', 'created_at')
