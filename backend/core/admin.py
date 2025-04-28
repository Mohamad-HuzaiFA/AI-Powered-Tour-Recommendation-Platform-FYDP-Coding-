# from django.contrib import admin
# from .models import (
#     User,
#     Tour,
#     TourImage,
#     TourGallery,
#     TourPackage,
#     Booking,
#     Payment,
#     Review,
#     Notification
# )

# # ✅ Registering Models in the Admin Site

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'user_type', 'is_verified', 'created_at')
#     search_fields = ('username', 'email')
#     list_filter = ('user_type', 'is_verified', 'created_at')

# @admin.register(Tour)
# class TourAdmin(admin.ModelAdmin):
#     list_display = ('title', 'location', 'price', 'availability', 'company', 'created_at')
#     search_fields = ('title', 'location')
#     list_filter = ('created_at', 'location', 'company')

# @admin.register(TourImage)
# class TourImageAdmin(admin.ModelAdmin):
#     list_display = ('tour', 'id')
#     search_fields = ('tour__title',)

# @admin.register(TourGallery)
# class TourGalleryAdmin(admin.ModelAdmin):
#     list_display = ('tour', 'id', 'uploaded_at')
#     search_fields = ('tour__title',)

# @admin.register(TourPackage)
# class TourPackageAdmin(admin.ModelAdmin):
#     list_display = ('title', 'price', 'availability', 'season', 'location', 'company', 'created_at')
#     search_fields = ('title', 'location', 'company__username')
#     list_filter = ('season', 'company', 'created_at')

# @admin.register(Booking)
# class BookingAdmin(admin.ModelAdmin):
#     list_display = ('user', 'tour', 'status', 'booking_date')
#     search_fields = ('user__email', 'tour__title')
#     list_filter = ('status', 'booking_date')

# @admin.register(Payment)
# class PaymentAdmin(admin.ModelAdmin):
#     list_display = ('id', 'booking', 'amount', 'method', 'status', 'created_at')
#     search_fields = ('booking__user__email', 'booking__tour__title')
#     list_filter = ('method', 'status', 'created_at')

# @admin.register(Review)
# class ReviewAdmin(admin.ModelAdmin):
#     list_display = ('user', 'tour', 'rating','created_at')
#     search_fields = ('user__username', 'tour__title')
#     list_filter = ('rating','created_at')

# @admin.register(Notification)
# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ('user', 'message', 'status', 'created_at')
#     search_fields = ('user__username', 'message')
#     list_filter = ('status', 'created_at')



from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Custom User Admin
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'user_type', 'is_verified', 'company_name')
    list_filter = ('user_type', 'is_verified')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'user_type', 'phone_number', 'company_name', 'website')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_verified', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'user_type', 'password1', 'password2'),
        }),
    )

# Tour Admin
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'price_per_person', 'tour_type', 'location', 'availability')
    list_filter = ('tour_type', 'location')
    search_fields = ('title', 'description')
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at',)

# # Tour Package Admin
# class TourPackageAdmin(admin.ModelAdmin):
#     list_display = ('title', 'price_per_person', 'season', 'tour_type', 'location', 'availability')
#     list_filter = ('season', 'tour_type', 'location')
#     search_fields = ('title', 'description')
#     filter_horizontal = ('tags',)
#     readonly_fields = ('created_at',)

# Company Profile Admin
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'verified', 'average_rating', 'established_year')
    list_filter = ('verified',)
    search_fields = ('user__username', 'user__company_name')

# User Tour Preference Admin
class UserTourPreferenceAdmin(admin.ModelAdmin):
    list_display = ('user', 'budget_min', 'budget_max', 'group_size', 'last_updated')
    search_fields = ('user__username',)
    readonly_fields = ('last_updated',)

# Tour Tag Admin
class TourTagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    readonly_fields = ('created_at',)


class TourImageAdmin(admin.ModelAdmin):
    list_display = ('tour', 'id')
    search_fields = ('tour__title',)

# Tour Gallery Admin
class TourGalleryAdmin(admin.ModelAdmin):
    list_display = ('tour', 'uploaded_at')
    readonly_fields = ('uploaded_at',)

class TourGalleryInline(admin.TabularInline):  # or admin.StackedInline if you prefer
    model = TourGallery
    extra = 1  # This controls how many empty forms to display by default in the admin interface.
    fields = ('image',)  # Customize the fields shown in the inline form if needed.

# Booking Admin
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'tour', 'status', 'booking_date', 'number_of_people')
    list_filter = ('status',)
    search_fields = ('user__username', 'tour__title')
    readonly_fields = ('booking_date',)

# Payment Admin
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('booking', 'amount', 'method', 'status', 'created_at')
    list_filter = ('method', 'status')
    readonly_fields = ('created_at',)

# Review Admin
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'review_type', 'would_recommend', 'created_at')
    list_filter = ('review_type', 'rating', 'would_recommend')
    search_fields = ('user__username', 'comment')
    readonly_fields = ('created_at',)

# Notification Admin
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'created_at', 'short_message')
    list_filter = ('status',)
    readonly_fields = ('created_at',)
    
    def short_message(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    short_message.short_description = 'Message'

# Register all models
admin.site.register(User, CustomUserAdmin)
admin.site.register(Tour, TourAdmin)
# admin.site.register(TourPackage, TourPackageAdmin)
admin.site.register(CompanyProfile, CompanyProfileAdmin)
admin.site.register(UserTourPreference, UserTourPreferenceAdmin)
admin.site.register(TourTag, TourTagAdmin)
admin.site.register(TourImage, TourImageAdmin)
admin.site.register(TourGallery, TourGalleryAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Notification, NotificationAdmin)