from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Notification, Review, Tour, TourImage, TourTag
from .pricing_utils import calculate_dynamic_price, get_lat_lon_from_weather
from .map_utils import get_static_map_url
from datetime import date

User = get_user_model()

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



from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)  # Status is read-only during booking

    class Meta:
        model = Booking
        fields = ['id', 'user', 'tour', 'status', 'booking_date']
        read_only_fields = ['id', 'user', 'status', 'booking_date']

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user  # Set the authenticated user
        return super().create(validated_data)

class BookingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status']


from rest_framework import serializers
from .models import Payment

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
    
    
    