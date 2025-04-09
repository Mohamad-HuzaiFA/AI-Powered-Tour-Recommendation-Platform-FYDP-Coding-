from django.urls import path
from .views import CreateReviewView, MarkNotificationReadView, TourReviewsListView, UserNotificationsView, UserSignupView, UserLoginView,protected_view
from rest_framework_simplejwt.views import TokenRefreshView
from .views import TourListCreateView, TourDetailView, TourImageUploadView, UploadTourGalleryImageView
from .views import TourPackageListView, TourPackageCreateView, TourPackageDetailView
from .views import CreateBookingView, TouristBookingListView, CompanyBookingListView, UpdateBookingStatusView
from .views import PaymentCreateView, PaymentUpdateView, PaymentDetailView
# from .api import recommend
from . import api
from core import api

# from django.http import JsonResponse

# def test_view(request):
#     return JsonResponse({"message": "Django API is working with Next.js!"})

# urlpatterns = [
#     path("api/test-endpoint/", test_view),]

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-endpoint/', protected_view, name='protected'),

    path('tours/', TourListCreateView.as_view(), name="tour-list-create"),
    path('tours/<uuid:pk>/', TourDetailView.as_view(), name="tour-detail"),
    path('tours/upload-image/', TourImageUploadView.as_view(), name="tour-image-upload"),

    path('tours/<uuid:tour_id>/upload-images/', UploadTourGalleryImageView.as_view(), name='upload-tour-images'),
    
    path('tour-packages/', TourPackageListView.as_view(), name='tour-package-list'),
    path('tour-packages/create/', TourPackageCreateView.as_view(), name='tour-package-create'),
    path('tour-packages/<uuid:pk>/', TourPackageDetailView.as_view(), name='tour-package-detail'),
    
    path('bookings/create/', CreateBookingView.as_view(), name='create-booking'),
    path('bookings/', TouristBookingListView.as_view(), name='tourist-bookings'),
    path('bookings/company/', CompanyBookingListView.as_view(), name='company-bookings'),
    path('bookings/<uuid:pk>/update-status/', UpdateBookingStatusView.as_view(), name='update-booking-status'),
    
    path("payments/", PaymentCreateView.as_view(), name="make-payment"),
    path("payments/<uuid:payment_id>/", PaymentDetailView.as_view(), name="payment-detail"),
    path("payments/<uuid:payment_id>/update/", PaymentUpdateView.as_view(), name="update-payment"),
    
    # Review Endpoints
    path("reviews/create/", CreateReviewView.as_view(), name="create-review"),
    path("reviews/tour/<uuid:tour_id>/", TourReviewsListView.as_view(), name="tour-reviews"),
    path('user/preferences/', api.save_preferences, name='save_preferences'),
    
    # Recommendation methods
    path('recommend/hybrid/', api.recommend_hybrid, name='recommend_hybrid'),
    path('recommend/content/', api.recommend_content, name='recommend_content'),
    path('recommend/popular/', api.recommend_popular, name='recommend_popular'),

    # Notification Endpoints
    path("notifications/", UserNotificationsView.as_view(), name="user-notifications"),
    path("notifications/<uuid:notification_id>/mark-read/", MarkNotificationReadView.as_view(), name="mark-notification-read"),
]

