# core/api.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import decimal
from .models import Tour, UserTourPreference, TourTag
import logging
from rest_framework.permissions import AllowAny

# Set up the logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@api_view(['POST'])
@permission_classes([AllowAny])
def save_preferences(request):
    try:
        # Get the user making the request
        user = request.user

        # Ensure 'budgetMin' and 'budgetMax' are Decimal
        budget_min = request.data.get('budgetMin', 0)
        budget_max = request.data.get('budgetMax', 10000)

        # If they are sent as strings, convert them to decimal
        budget_min = decimal.Decimal(budget_min) if isinstance(budget_min, str) else budget_min
        budget_max = decimal.Decimal(budget_max) if isinstance(budget_max, str) else budget_max

        # Check if the user already has preferences
        preferences, created = UserTourPreference.objects.update_or_create(
            user=user,
            defaults={
                'budget_min': budget_min,
                'budget_max': budget_max,
                'preferred_tour_types': request.data.get('tourTypes', []),  # Match frontend field name
                'preferred_locations': request.data.get('locations', []),   # Match frontend field name
                'group_size': request.data.get('groupSize', 1)
            }
        )

        return Response({"message": "Preferences saved successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Method-specific recommendation endpoints
@api_view(['POST'])
@permission_classes([AllowAny])
def recommend_hybrid(request):
    """Hybrid recommendation combining content-based and rating-based approaches"""
    return process_recommendation(request, method='hybrid')

@api_view(['POST'])
@permission_classes([AllowAny])
def recommend_content(request):
    """Content-based recommendation using TF-IDF"""
    return process_recommendation(request, method='content')

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def recommend_popular(request):
    """Popular tours based on ratings"""
    try:
        # Get top 10 tours by rating
        tours = Tour.objects.all().order_by('-company__company_profile__average_rating')[:10]
        
        return Response({
            'recommendations': [format_tour_response(tour, request, score=None) for tour in tours]
        })
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






def process_recommendation(request, method='hybrid'):
    try:
        logger.info(f"🔍 Starting {method} recommendation processing.")
        logger.debug(f"Received request data: {request.data}")

        # Extract preferences from request with safe defaults
        try:
            budget_min = decimal.Decimal(request.data.get('budgetMin', 0) or 0)
            budget_max = decimal.Decimal(request.data.get('budgetMax', 10000) or 10000)
        except Exception as e:
            logger.error(f"❌ Error converting budget to Decimal: {e}")
            return Response({"error": "Invalid budget format"}, status=status.HTTP_400_BAD_REQUEST)

        preferences = {
            'budget_min': budget_min,
            'budget_max': budget_max,
            'preferred_tour_types': request.data.get('tourTypes', []),
            'preferred_locations': request.data.get('locations', []),
            'group_size': request.data.get('groupSize')
        }

        logger.info("✅ Preferences parsed successfully.")

        # Create filter query
        query = Q(price_per_person__gte=preferences['budget_min']) & Q(price_per_person__lte=preferences['budget_max'])

        if preferences['preferred_tour_types']:
            query &= Q(tour_type__in=preferences['preferred_tour_types'])

        if preferences['preferred_locations']:
            query &= Q(location__in=preferences['preferred_locations'])

        if preferences['group_size']:
            try:
                group_size = int(preferences['group_size'])
                query &= Q(min_group_size__lte=group_size)
                query &= Q(max_group_size__gte=group_size)
            except ValueError:
                logger.error("❌ Invalid group size provided.")
                return Response({"error": "Invalid group size"}, status=status.HTTP_400_BAD_REQUEST)

        # Query the tours
        tours = Tour.objects.filter(query)
        logger.info(f"🔎 Found {tours.count()} tours matching filters.")

        if not tours:
            logger.warning("⚠️ No tours match the given preferences.")
            return Response({
                'recommendations': [],
                'message': 'No tours match your preferences'
            })

        # Prepare descriptions for TF-IDF
        tour_descriptions = []
        for tour in tours:
            tags = ' '.join(tour.tags.values_list('name', flat=True))
            tour_descriptions.append(f"{tour.title} {tour.description} {tags} {tour.location} {tour.tour_type}")

        user_query = ' '.join(preferences['preferred_tour_types'] + preferences['preferred_locations'] + ['tour', 'travel'])

        # TF-IDF Vectorization
        vectorizer = TfidfVectorizer(stop_words='english')
        try:
            tfidf_matrix = vectorizer.fit_transform(tour_descriptions)
            user_vector = vectorizer.transform([user_query])
            similarity_scores = cosine_similarity(user_vector, tfidf_matrix).flatten()
        except Exception as tfidf_error:
            logger.warning(f"⚠️ TF-IDF failed: {tfidf_error}. Using fallback similarity.")
            similarity_scores = [0.5] * len(tours)

        # Compute final scores
        results = []
        for idx, tour in enumerate(tours):
            content_score = similarity_scores[idx]

            if method == 'hybrid':
                rating = getattr(getattr(tour.company, 'company_profile', None), 'average_rating', 0)
                rating_score = float(rating) / 5.0 if rating else 0
                final_score = (0.7 * content_score) + (0.3 * rating_score)
            else:
                final_score = content_score

            results.append({
                'tour': tour,
                'score': final_score
            })

        logger.info("✅ Scoring complete. Preparing final recommendation list.")

        # Sort by score and format
        sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)[:10]
        recommendations = [
            format_tour_response(item['tour'], request, item['score'])
            for item in sorted_results
        ]

        logger.info(f"✅ Returning {len(recommendations)} recommendations.")

        return Response({
            'recommendations': recommendations,
            'method_used': method
        })

    except Exception as e:
        logger.exception("🚨 Unexpected error during recommendation process:")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



















# def process_recommendation(request, method='hybrid'):
#     try:
#         # Extract preferences from the request
#         preferences = {
#             'budget_min': decimal.Decimal(request.data.get('budgetMin', 0)),
#             'budget_max': decimal.Decimal(request.data.get('budgetMax', 10000)),
#             'preferred_tour_types': request.data.get('tourTypes', []),
#             'preferred_locations': request.data.get('locations', []),
#             'group_size': request.data.get('groupSize')
#         }
        
#         # Create a filter for tours
#         query = Q()
        
#         # Budget filter
#         query &= Q(price_per_person__gte=preferences['budget_min'])
#         query &= Q(price_per_person__lte=preferences['budget_max'])
        
#         # Tour types filter if provided
#         if preferences['preferred_tour_types']:
#             query &= Q(tour_type__in=preferences['preferred_tour_types'])
            
#         # Locations filter if provided
#         if preferences['preferred_locations']:
#             query &= Q(location__in=preferences['preferred_locations'])
            
#         # Group size filter if provided
#         if preferences['group_size']:
#             group_size = int(preferences['group_size'])
#             query &= Q(min_group_size__lte=group_size)
#             query &= Q(max_group_size__gte=group_size)
            
#         # Get filtered tours
#         tours = Tour.objects.filter(query)
        
#         if not tours:
#             return Response({
#                 'recommendations': [],
#                 'message': 'No tours match your preferences'
#             })
            
#         # Get tour descriptions for TF-IDF
#         tour_descriptions = []
#         for tour in tours:
#             tags = ' '.join(tour.tags.values_list('name', flat=True))
#             tour_descriptions.append(f"{tour.title} {tour.description} {tags} {tour.location} {tour.tour_type}")
            
#         # Create user query from preferences
#         user_query = ' '.join(
#             preferences['preferred_tour_types'] + 
#             preferences['preferred_locations'] + 
#             ['tour', 'travel']  # Add some general terms
#         )
        
#         # TF-IDF Vectorization
#         vectorizer = TfidfVectorizer(stop_words='english')
#         try:
#             tfidf_matrix = vectorizer.fit_transform(tour_descriptions)
#             user_vector = vectorizer.transform([user_query])
            
#             # Calculate similarity scores
#             similarity_scores = cosine_similarity(user_vector, tfidf_matrix).flatten()
#         except Exception as e:
#             # Fallback if TF-IDF fails
#             similarity_scores = [0.5] * len(tours)  # Default 50% match
            
#         # Prepare results with different scoring based on method
#         results = []
#         for idx, tour in enumerate(tours):
#             content_score = similarity_scores[idx]
            
#             if method == 'hybrid':
#                 # Combine content score with rating score
#                 rating = tour.company.company_profile.average_rating if hasattr(tour.company, 'company_profile') else 0
#                 rating_score = float(rating) / 5.0 if rating else 0  # Normalize to 0-1
#                 final_score = (0.7 * content_score) + (0.3 * rating_score)
#             else:
#                 # Content-based only
#                 final_score = content_score
                
#             results.append({
#                 'tour': tour,
#                 'score': final_score
#             })
            
#         # Sort results by score and get top 10
#         sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)[:10]
        
#         # Format response
#         recommendations = [
#             format_tour_response(item['tour'], request, item['score']) 
#             for item in sorted_results
#         ]
        
#         return Response({
#             'recommendations': recommendations,
#             'method_used': method
#         })
        
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def format_tour_response(tour, request, score=None):
    """Format tour data for API response"""
    response = {
        'id': str(tour.id),  # Convert UUID to string
        'title': tour.title,
        'description': tour.description[:100] + '...' if len(tour.description) > 100 else tour.description,
        'price_per_person': float(tour.price_per_person),  # Convert Decimal to float
        'price': float(tour.price_per_person),  # Add price alias for frontend
        'location': tour.location,
        'tour_type': tour.tour_type,
        'duration': tour.duration,
        'company': tour.company.username,
    }
    
    # Add match score if provided
    if score is not None:
        response['match_score'] = score  # Return as decimal (0.0-1.0)
    
    # Add image URL if available
    if tour.main_image and hasattr(tour.main_image, 'url'):
        response['image'] = request.build_absolute_uri(tour.main_image.url)
        
    return response


