from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Notification, Review, Tour, TourImage, TourTag
from .pricing_utils import calculate_dynamic_price, get_lat_lon_from_weather
from .map_utils import get_static_map_url
from datetime import date

User = get_user_model()

# tours/serializers.py
from rest_framework import serializers
from .models import Payment

class PaymentReceiptUploadSerializer(serializers.ModelSerializer):
    booking_id = serializers.UUIDField(write_only=False, required=False)

    class Meta:
        model  = Payment
        fields = [
            "id", "booking_id", "receipt_image", "transaction_id",
            "amount", "method", "status", "created_at"
        ]
        read_only_fields = ["id", "amount", "method", "status", "created_at"]

    def validate(self, data):
        # ensure the payment really belongs to this user
        user = self.context["request"].user
        try:
            payment = Payment.objects.get(booking__id=data["booking_id"],
                                          booking__user=user)
        except Payment.DoesNotExist:
            raise serializers.ValidationError("No pending payment for this booking.")
        data["instance"] = payment
        return data

    def create(self, validated):
        # never called – we're updating existing Payment
        pass

    def update(self, instance, validated):
        instance.receipt_image  = validated.get("receipt_image")
        instance.transaction_id = validated.get("transaction_id", "")
        instance.save(update_fields=["receipt_image", "transaction_id"])
        return instance


class AdminPaymentVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Payment
        fields = ["status"]       # we only allow changing status → successful / failed

    def validate_status(self, val):
        if val not in ("successful", "failed"):
            raise serializers.ValidationError("Status must be successful or failed.")
        return val




# User Signup Serializer
class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'user_type']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data['user_type']
        )
        return user

# User Login Serializer
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.filter(email=data['email']).first()
        if user and user.check_password(data['password']):
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type,
                }
            }
        raise serializers.ValidationError("Invalid credentials")


class TourImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = ['id', 'image', 'tour']

    def validate_image(self, value):
        if not value:
            raise serializers.ValidationError("Image file is required.")
        return value


class TourSerializer(serializers.ModelSerializer):
    dynamic_price = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()
    map_url = serializers.SerializerMethodField()  # Re-add map_url if you want it as a fallback
    main_image = serializers.ImageField(required=False)  # Make it not required for updates  
    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'description', 'price_per_person', 'dynamic_price',
            'latitude', 'longitude',
            'map_url',  # Include map_url
            'duration',
            'location', 'main_image', 'availability', 'min_group_size',
            'max_group_size', 'tour_type', 'season', 'tags',
            'ai_keywords', 'start_date', 'end_date', 'created_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'latitude', 'longitude', 'map_url']

    def get_dynamic_price(self, tour):
        base = float(tour.price_per_person)
        loc = tour.location
        tour_date = tour.start_date or date.today()
        return calculate_dynamic_price(base, loc, tour_date.isoformat())

    def get_latitude(self, tour):
        latitude, _ = get_lat_lon_from_weather(tour.location)
        return latitude

    def get_longitude(self, tour):
        _, longitude = get_lat_lon_from_weather(tour.location)
        return longitude

    def get_map_url(self, tour):
        latitude, longitude = get_lat_lon_from_weather(tour.location)
        if latitude and longitude:
            return get_static_map_url(latitude, longitude)
        return None
    


class TourTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourTag
        fields = ['id', 'name']
        read_only_fields = ['id']  # Ensure the ID is not editable during creation/update

# from .models import TourPackage

# class TourPackageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TourPackage
#         fields = '__all__'


# tours/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
# Make sure to import your Booking and Tour models
from .models import Notification, Review, Tour, TourImage, TourTag, Payment, Booking # ADD Booking and Tour
from .pricing_utils import calculate_dynamic_price, get_lat_lon_from_weather
from .map_utils import get_static_map_url
from datetime import date

User = get_user_model()

# ... (your other serializers like PaymentReceiptUploadSerializer, etc.) ...

# Ensure you import Booking model here
# from .models import Booking # Already imported above, just ensuring it's clear

class BookingSerializer(serializers.ModelSerializer):
    # This will allow you to send 'tour_id' (a UUID) from the frontend
    # and DRF will automatically convert it to a Tour instance.
    # You need to ensure the Tour model is imported.
    tour = serializers.PrimaryKeyRelatedField(queryset=Tour.objects.all())

    # This will allow you to send 'booking_date' string from the frontend.
    # It correctly expects a date string in 'YYYY-MM-DD' format.
    booking_date = serializers.DateTimeField()

    status = serializers.CharField(read_only=True) # Status is still read-only, set by backend

    class Meta:
        model = Booking
        # These are the fields that the API will handle.
        # 'id' is for output.
        # 'user' is handled by the create method (setting request.user).
        # 'status' is read-only (set by backend logic).
        # 'tour' and 'booking_date' are now explicitly made writable by the fields above.
        fields = ['id', 'user', 'tour', 'status', 'booking_date']
        # Remove 'booking_date' and 'tour' from read_only_fields list
        read_only_fields = ['id', 'user', 'status']

    def create(self, validated_data):
        # This method automatically sets the user based on the authenticated request
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

class BookingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status']

# ... (your other serializers like PaymentSerializer, AdminPaymentVerifySerializer) ...
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'booking', 'amount', 'method', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate(self, data):
        """Ensure the correct amount is used for payment"""
        booking = data['booking']
        actual_amount = booking.tour.price  # Get actual tour price

        # Auto-correct the amount
        data['amount'] = actual_amount

        return data
    
    
class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Read-only user field

    class Meta:
        model = Review
        fields = ['id', 'user', 'tour', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user  # Set authenticated user
        return super().create(validated_data)


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'user', 'message', 'created_at']
    
    
    