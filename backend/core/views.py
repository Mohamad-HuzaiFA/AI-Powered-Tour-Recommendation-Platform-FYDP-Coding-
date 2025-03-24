from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import NotificationSerializer, ReviewSerializer, UserSignupSerializer, UserLoginSerializer, TourSerializer, TourImageSerializer
from .models import Notification, Review, Tour, TourImage
from .permissions import IsTourist, IsTourismCompany
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser


# User Signup API
class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login API
class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    print("DEBUG: Checking authentication status...")
    print(f"User: {request.user}, Authenticated: {request.user.is_authenticated}")

    if not request.user.is_authenticated:
        return Response({"error": "User is not authenticated"}, status=403)

    return Response({"message": f"Hello {request.user.username}, you have access!"})

# Tour list - Both tourists & companies can view tours
class TourListView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [IsAuthenticated]

# Tour creation - Only tourism companies can create tours
class TourCreateView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [IsAuthenticated, IsTourismCompany]

# Booking tour - Only tourists can book a tour
class BookTourView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [IsAuthenticated, IsTourist]

# Tour List and Create View
class TourListCreateView(generics.ListCreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)

# Tour Detail View
class TourDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Tour Image Upload View
class TourImageUploadView(generics.CreateAPIView):
    queryset = TourImage.objects.all()
    serializer_class = TourImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        tour_id = self.request.data.get("tour")
        tour = Tour.objects.get(id=tour_id)
        serializer.save(tour=tour)


class UploadTourGalleryImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, tour_id, *args, **kwargs):
        # Ensure images are provided
        images = request.FILES.getlist("image")  # Get multiple images
        if not images:
            return Response({"error": "No image files provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate tour_id and check if tour exists
        try:
            tour = Tour.objects.get(id=tour_id)
        except Tour.DoesNotExist:
            return Response({"error": "Tour not found."}, status=status.HTTP_404_NOT_FOUND)

        # Process and save each image
        uploaded_images = []
        for image in images:
            serializer = TourImageSerializer(data={"image": image, "tour": tour.pk})
            if serializer.is_valid():
                serializer.save()
                uploaded_images.append(request.build_absolute_uri(serializer.instance.image.url))  
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Images uploaded successfully!", "image_urls": uploaded_images}, status=status.HTTP_201_CREATED)



from .models import TourPackage
from .serializers import TourPackageSerializer

#  List all packages (Tourists & Companies)
class TourPackageListView(generics.ListAPIView):
    queryset = TourPackage.objects.all()
    serializer_class = TourPackageSerializer
    permission_classes = [permissions.IsAuthenticated]

#  Create a tour package (Only Tourism Companies)
class TourPackageCreateView(generics.CreateAPIView):
    queryset = TourPackage.objects.all()
    serializer_class = TourPackageSerializer
    permission_classes = [permissions.IsAuthenticated, IsTourismCompany]

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)  # Assign logged-in company

#  Retrieve, Update, Delete a package (Only the creator can modify)
class TourPackageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TourPackage.objects.all()
    serializer_class = TourPackageSerializer
    permission_classes = [permissions.IsAuthenticated, IsTourismCompany]

    def get_queryset(self):
        return TourPackage.objects.filter(company=self.request.user)



from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer, BookingUpdateSerializer

#  Create a Booking
class CreateBookingView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]  # Only logged-in users can book

#  Get All Bookings for a Tourist
class TouristBookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)  # Get bookings of logged-in user

#  Get All Bookings for a Tour Company
class CompanyBookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(tour__company=self.request.user)  # Get bookings for company's tours

#  Update Booking Status (Company can confirm/cancel)
class UpdateBookingStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            booking = Booking.objects.get(id=pk, tour__company=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or unauthorized"}, status=404)

        serializer = BookingUpdateSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Booking status updated successfully"})
        return Response(serializer.errors, status=400)



from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Booking, Payment
from .serializers import PaymentSerializer

#  Create a Payment (Simulated Payment Processing)
# class PaymentCreateView(APIView):
#     def post(self, request, *args, **kwargs):
#         booking_id = request.data.get("booking")
#         amount = request.data.get("amount")
#         method = request.data.get("method")

#         #  Ensure Booking Exists
#         try:
#             booking = Booking.objects.get(id=booking_id)
#         except Booking.DoesNotExist:
#             return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

#         #  Ensure Booking Doesn't Already Have a Payment
#         if hasattr(booking, "payment"):
#             return Response({"error": "Payment already exists for this booking"}, status=status.HTTP_400_BAD_REQUEST)

#         #  Create a Payment Entry (Simulated Payment)
#         payment = Payment.objects.create(
#             booking=booking,
#             amount=amount,
#             method=method,
#             status="pending",  # Default status
#         )

#         serializer = PaymentSerializer(payment)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class PaymentCreateView(APIView):
    def post(self, request, *args, **kwargs):
        booking_id = request.data.get("booking")
        amount = request.data.get("amount")
        method = request.data.get("method")

        # ✅ Ensure Booking Exists
        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Ensure Booking Doesn't Already Have a Payment
        if hasattr(booking, "payment"):
            return Response({"error": "Payment already exists for this booking"}, status=status.HTTP_400_BAD_REQUEST)

        # # ✅ Validate Amount (Must Match Tour Price)
        if amount != booking.tour.price:
            amount = booking.tour.price
        #     return Response({"error": "Invalid amount. Must match tour price."}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Create a Payment Entry (Pending)
        payment = Payment.objects.create(
            booking=booking,
            amount=amount,
            method=method,
            status="pending",  # Default status
        )

        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


#  Get Payment Details
class PaymentDetailView(APIView):
    def get(self, request, payment_id, *args, **kwargs):
        try:
            payment = Payment.objects.get(id=payment_id)
        except Payment.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)


# #  Update Payment Status & Confirm Booking if Successful
# class PaymentUpdateView(APIView):
#     def patch(self, request, payment_id, *args, **kwargs):
#         try:
#             payment = Payment.objects.get(id=payment_id)
#         except Payment.DoesNotExist:
#             return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

#         new_status = request.data.get("status")
#         if new_status not in ["successful", "failed"]:
#             return Response({"error": "Invalid status update"}, status=status.HTTP_400_BAD_REQUEST)

#         #  Update Payment Status
#         payment.status = new_status
#         payment.save()

#         #  If payment is successful, update the booking status to "confirmed"
#         if new_status == "successful":
#             payment.booking.status = "confirmed"
#             payment.booking.save()

#         return Response({"message": f"Payment updated to {new_status}"}, status=status.HTTP_200_OK)

class PaymentUpdateView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users or system can update

    def patch(self, request, payment_id, *args, **kwargs):
        try:
            payment = Payment.objects.get(id=payment_id)
        except Payment.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get("status")
        if new_status not in ["successful", "failed"]:
            return Response({"error": "Invalid status update"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Allow only SYSTEM (Automated) or ADMIN to update payment status
        if not request.user.is_staff:  # Ensure only admin can update manually if needed
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        # ✅ Update Payment Status
        payment.status = new_status
        payment.save()

        # ✅ If payment is successful, confirm the booking automatically
        if new_status == "successful":
            payment.booking.status = "confirmed"
            payment.booking.save()
            # Send notification to user
            Notification.objects.create(
                user=payment.booking.user,
                message=f"Your booking for {payment.booking.tour.title} has been confirmed."
            )

        return Response({"message": f"Payment updated to {new_status}"}, status=status.HTTP_200_OK)


# ✅ Create a Review
class CreateReviewView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]  # Only logged-in users can review

# ✅ Get Reviews for a Tour
class TourReviewsListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        tour_id = self.kwargs["tour_id"]
        return Review.objects.filter(tour__id=tour_id)  # Get all reviews for a tour



# ✅ Get User Notifications
class UserNotificationsView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)  # Get logged-in user's notifications

# ✅ Mark Notification as Read
class MarkNotificationReadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, notification_id):
        try:
            notification = Notification.objects.get(id=notification_id, user=request.user)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=404)

        notification.status = "read"
        notification.save()
        return Response({"message": "Notification marked as read"}, status=200)
