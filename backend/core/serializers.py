from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Notification, Review, Tour, TourImage

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
    gallery_images = TourImageSerializer(many=True, read_only=True)
    main_image = serializers.ImageField(required=True)

    class Meta:
        model = Tour
        fields = ['id', 'title', 'description', 'price', 'duration', 'location', 
                  'company', 'main_image', 'gallery_images', 'availability', 'created_at']


from .models import TourPackage

class TourPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourPackage
        fields = '__all__'



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
    