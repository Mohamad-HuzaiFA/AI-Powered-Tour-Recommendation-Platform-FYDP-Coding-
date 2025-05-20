from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import decimal
from .models import Tour, UserTourPreference, TourTag
import logging

# Set up the logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_preferences(request):
    user = request.user
    logger.info(f"💾 Saving preferences for user: {user.username}")
    logger.debug(f"Received preference data: {request.data}")

    try:
        data = request.data
        # Convert budget if provided
        budget_min = data.get('budgetMin', None)
        budget_max = data.get('budgetMax', None)
        if budget_min is not None:
            budget_min = decimal.Decimal(budget_min)
        if budget_max is not None:
            budget_max = decimal.Decimal(budget_max)

        # Prepare defaults dict
        defaults = {
            'preferred_tour_types': data.get('tourTypes', []),
            'preferred_locations': data.get('locations', []),
            'group_size': data.get('groupSize', 1)
        }
        if budget_min is not None:
            defaults['budget_min'] = budget_min
        if budget_max is not None:
            defaults['budget_max'] = budget_max

        preferences, created = UserTourPreference.objects.update_or_create(
            user=user,
            defaults=defaults
        )
        logger.info(f"✅ Preferences saved (created={created}).")
        logger.debug(f"📝 Preferences state: {preferences.__dict__}")
        return Response({"message": "Preferences saved successfully"}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"❌ Error saving preferences for {user.username}: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def recommend_hybrid(request):
    """Hybrid recommendation combining content-based and rating-based approaches"""
    return process_recommendation(request, method='hybrid')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def recommend_content(request):
    """Content-based recommendation using TF-IDF"""
    return process_recommendation(request, method='content')


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def recommend_popular(request):
    """Popular tours based on ratings"""
    try:
        tours = Tour.objects.all().order_by('-company__company_profile__average_rating')[:10]
        logger.info(f"✅ Returning {tours.count()} popular tours for {request.user.username}.")
        return Response({
            'recommendations': [format_tour_response(t, request, score=None) for t in tours]
        })
    except Exception as e:
        logger.error(f"❌ Error fetching popular tours for {request.user.username}: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def format_tour_response(tour, request, score=None):
    """Format tour data for API response"""
    resp = {
        'id': str(tour.id),
        'title': tour.title,
        'description': tour.description[:100] + '...' if len(tour.description) > 100 else tour.description,
        'price_per_person': float(tour.price_per_person),
        'price': float(tour.price_per_person),
        'location': tour.location,
        'tour_type': tour.tour_type,
        'duration': tour.duration,
        'company': tour.company.username,
    }
    if score is not None:
        resp['match_score'] = score
    if tour.main_image and hasattr(tour.main_image, 'url'):
        resp['image'] = request.build_absolute_uri(tour.main_image.url)
    return resp


def process_recommendation(request, method='hybrid'):
    try:
        user = request.user
        logger.info(f"🔍 Starting {method} recommendations for user: {user.username}")
        data = request.data or {}

        # Build filters based on provided preferences
        query = Q()
        # Budget filter if present
        if 'budgetMin' in data or 'budgetMax' in data:
            try:
                b_min = decimal.Decimal(data.get('budgetMin', 0) or 0)
                b_max = decimal.Decimal(data.get('budgetMax', b_min) or b_min)
                query &= Q(price_per_person__gte=b_min) & Q(price_per_person__lte=b_max)
                logger.debug(f"✅ Applied budget filter: [{b_min}, {b_max}]")
            except Exception as e:
                logger.error(f"❌ Invalid budget values: {e}")
                return Response({"error": "Invalid budget format"}, status=status.HTTP_400_BAD_REQUEST)

        # Tour types
        tour_types = data.get('tourTypes', [])
        if tour_types:
            query &= Q(tour_type__in=tour_types)
            logger.debug(f"✅ Applied tour type filter: {tour_types}")

        # Locations
        locations = data.get('locations', [])
        if locations:
            query &= Q(location__in=locations)
            logger.debug(f"✅ Applied location filter: {locations}")

        # Group size
        if data.get('groupSize') is not None:
            try:
                gs = int(data['groupSize'])
                query &= Q(min_group_size__lte=gs) & Q(max_group_size__gte=gs)
                logger.debug(f"✅ Applied group size filter: {gs}")
            except Exception:
                logger.error(f"❌ Invalid group size: {data['groupSize']}")
                return Response({"error": "Invalid group size"}, status=status.HTTP_400_BAD_REQUEST)

        # Initial pool
        tours = Tour.objects.filter(query)
        logger.info(f"🔎 Found {tours.count()} tours after filtering.")

        # If no tours after filters, expand pool to all tours (no fallback return)
        if not tours:
            logger.warning(f"⚠️ No tours match filters for user {user.username}. Expanding to all.")
            tours = Tour.objects.all()
            # return Response({'recommendations': [], 'method_used': method}, status=status.HTTP_200_OK)

        # Prepare TF-IDF
        descriptions = []
        for t in tours:
            tags = ' '.join(t.tags.values_list('name', flat=True))
            descriptions.append(f"{t.title} {t.description} {tags} {t.location} {t.tour_type}")

        user_query = ' '.join(tour_types + locations + ['tour', 'travel'])
        vectorizer = TfidfVectorizer(stop_words='english')
        sims = [0.0] * len(tours)
        try:
            if descriptions:
                mat = vectorizer.fit_transform(descriptions)
                uv = vectorizer.transform([user_query])
                sims = cosine_similarity(uv, mat).flatten()
                logger.debug(f"✅ Computed TF-IDF similarities.")
            else:
                logger.warning("⚠️ No tour descriptions available for TF-IDF.")
        except Exception as e:
            logger.warning(f"⚠️ TF-IDF error: {e}")

        # Score and sort
        scored = []
        for idx, t in enumerate(tours):
            content_score = sims[idx]
            if method == 'hybrid':
                rating = getattr(getattr(t.company, 'company_profile', None), 'average_rating', 0) or 0
                rating_score = float(rating) / 5.0
                final = (0.7 * content_score) + (0.3 * rating_score)
            else:
                final = content_score
            scored.append({'tour': t, 'score': final})

        top = sorted(scored, key=lambda x: x['score'], reverse=True)[:10]
        recs = [format_tour_response(x['tour'], request, x['score']) for x in top]

        logger.info(f"✅ Returning {len(recs)} {method} recommendations.")
        return Response({'recommendations': recs, 'method_used': method}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.exception(f"🚨 Error in recommendation flow: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)











# # core/api.py
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from django.db.models import Q
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import decimal
# from .models import Tour, UserTourPreference, TourTag
# import logging
# from rest_framework.permissions import AllowAny

# # Set up the logger
# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def save_preferences(request):
#     try:
#         # Get the user making the request
#         user = request.user

#         # Ensure 'budgetMin' and 'budgetMax' are Decimal
#         budget_min = request.data.get('budgetMin', 0)
#         budget_max = request.data.get('budgetMax', 10000)

#         # If they are sent as strings, convert them to decimal
#         budget_min = decimal.Decimal(budget_min) if isinstance(budget_min, str) else budget_min
#         budget_max = decimal.Decimal(budget_max) if isinstance(budget_max, str) else budget_max

#         # Check if the user already has preferences
#         preferences, created = UserTourPreference.objects.update_or_create(
#             user=user,
#             defaults={
#                 'budget_min': budget_min,
#                 'budget_max': budget_max,
#                 'preferred_tour_types': request.data.get('tourTypes', []),  # Match frontend field name
#                 'preferred_locations': request.data.get('locations', []),   # Match frontend field name
#                 'group_size': request.data.get('groupSize', 1)
#             }
#         )

#         return Response({"message": "Preferences saved successfully"}, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# # Method-specific recommendation endpoints
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def recommend_hybrid(request):
#     """Hybrid recommendation combining content-based and rating-based approaches"""
#     return process_recommendation(request, method='hybrid')

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def recommend_content(request):
#     """Content-based recommendation using TF-IDF"""
#     return process_recommendation(request, method='content')

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def recommend_popular(request):
#     """Popular tours based on ratings"""
#     try:
#         # Get top 10 tours by rating
#         tours = Tour.objects.all().order_by('-company__company_profile__average_rating')[:10]
        
#         # Add diversity by including some tours from different price ranges
#         # ENHANCEMENT: Added price diversity to ensure varied recommendations
#         budget_ranges = [
#             (0, 100),
#             (100, 300),
#             (300, 1000),
#             (1000, 10000)
#         ]
        
#         diverse_tours = []
#         for min_price, max_price in budget_ranges:
#             range_tours = Tour.objects.filter(
#                 price_per_person__gte=min_price,
#                 price_per_person__lte=max_price
#             ).order_by('-company__company_profile__average_rating')[:3]
#             diverse_tours.extend(range_tours)
        
#         # Combine and remove duplicates while maintaining order
#         seen_ids = set()
#         final_tours = []
        
#         # First add original top rated tours
#         for tour in tours:
#             if tour.id not in seen_ids:
#                 seen_ids.add(tour.id)
#                 final_tours.append(tour)
        
#         # Then add diverse tours if needed to reach 10
#         for tour in diverse_tours:
#             if tour.id not in seen_ids and len(final_tours) < 10:
#                 seen_ids.add(tour.id)
#                 final_tours.append(tour)
        
#         return Response({
#             'recommendations': [format_tour_response(tour, request, score=None) for tour in final_tours]
#         })
#     except Exception as e:
#         logger.exception("Error in recommend_popular:")
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# def process_recommendation(request, method='hybrid'):
#     try:
#         logger.info(f"🔍 Starting {method} recommendation processing.")
#         logger.debug(f"Received request data: {request.data}")

#         # Extract preferences from request with safe defaults
#         try:
#             budget_min = decimal.Decimal(request.data.get('budgetMin', 0) or 0)
#             budget_max = decimal.Decimal(request.data.get('budgetMax', 10000) or 10000)
#         except Exception as e:
#             logger.error(f"❌ Error converting budget to Decimal: {e}")
#             return Response({"error": "Invalid budget format"}, status=status.HTTP_400_BAD_REQUEST)

#         preferences = {
#             'budget_min': budget_min,
#             'budget_max': budget_max,
#             'preferred_tour_types': request.data.get('tourTypes', []),
#             'preferred_locations': request.data.get('locations', []),
#             'group_size': request.data.get('groupSize')
#         }

#         logger.info("✅ Preferences parsed successfully.")

#         # Create filter query
#         query = Q(price_per_person__gte=preferences['budget_min']) & Q(price_per_person__lte=preferences['budget_max'])

#         if preferences['preferred_tour_types']:
#             # ENHANCEMENT: Added OR logic for tour types to find more potential matches
#             type_query = Q()
#             for tour_type in preferences['preferred_tour_types']:
#                 type_query |= Q(tour_type__icontains=tour_type)
#             query &= type_query

#         if preferences['preferred_locations']:
#             # ENHANCEMENT: Added OR logic for locations
#             location_query = Q()
#             for location in preferences['preferred_locations']:
#                 location_query |= Q(location__icontains=location)
#             query &= location_query

#         if preferences['group_size']:
#             try:
#                 group_size = int(preferences['group_size'])
#                 query &= Q(min_group_size__lte=group_size)
#                 query &= Q(max_group_size__gte=group_size)
#             except ValueError:
#                 logger.error("❌ Invalid group size provided.")
#                 return Response({"error": "Invalid group size"}, status=status.HTTP_400_BAD_REQUEST)

#         # Query the tours
#         tours = Tour.objects.filter(query)
#         logger.info(f"🔎 Found {tours.count()} tours matching filters.")

#         # ENHANCEMENT: If no tours found with strict criteria, try with relaxed criteria
#         if not tours:
#             logger.warning("⚠️ No tours match the given preferences. Trying with relaxed filters.")
#             # Try with just budget constraints
#             relaxed_query = Q(price_per_person__gte=preferences['budget_min']) & Q(price_per_person__lte=preferences['budget_max'])
#             tours = Tour.objects.filter(relaxed_query)
            
#             if not tours:
#                 return Response({
#                     'recommendations': [],
#                     'message': 'No tours match your preferences, even with relaxed criteria'
#                 })
#             else:
#                 logger.info(f"🔎 Found {tours.count()} tours with relaxed filters.")

#         # Prepare descriptions for TF-IDF
#         tour_descriptions = []
#         for tour in tours:
#             tags = ' '.join(tour.tags.values_list('name', flat=True))
#             # FIXED: No repeating terms for better TF-IDF handling
#             tour_descriptions.append(f"{tour.title} {tour.description} {tags} {tour.location} {tour.tour_type}")

#         # FIXED: Construct user query without repetition
#         user_query_parts = []
#         user_query_parts.extend(preferences['preferred_tour_types'])
#         user_query_parts.extend(preferences['preferred_locations'])
#         user_query_parts.extend(['tour', 'travel', 'experience', 'adventure'])
#         user_query = ' '.join(user_query_parts)

#         # TF-IDF Vectorization
#         # Use sublinear_tf to dampen the effect of term frequency
#         vectorizer = TfidfVectorizer(
#             stop_words='english', 
#             ngram_range=(1, 2),
#             sublinear_tf=True
#         )
        
#         try:
#             tfidf_matrix = vectorizer.fit_transform(tour_descriptions)
#             user_vector = vectorizer.transform([user_query])
            
#             # Calculate cosine similarity
#             similarity_scores = cosine_similarity(user_vector, tfidf_matrix).flatten()
            
#             # FIXED: Additional normalization for similarity scores
#             # This ensures they're in a reasonable range (they're often already between 0-1)
#             max_sim = max(similarity_scores) if len(similarity_scores) > 0 else 1.0
#             if max_sim > 0:
#                 # Normalize to 0-1 range
#                 similarity_scores = similarity_scores / max_sim
            
#         except Exception as tfidf_error:
#             logger.warning(f"⚠️ TF-IDF failed: {tfidf_error}. Using fallback similarity.")
#             similarity_scores = [0.5] * len(tours)

#         # Compute final scores
#         results = []
#         for idx, tour in enumerate(tours):
#             # Get content similarity score (already in 0-1 range from cosine similarity)
#             content_score = similarity_scores[idx]
            
#             # Ensure content_score is in 0-1 range
#             content_score = min(1.0, max(0.0, content_score))

#             if method == 'hybrid':
#                 # Get rating score (0-1 range)
#                 rating = getattr(getattr(tour.company, 'company_profile', None), 'average_rating', 0)
#                 rating_score = float(rating) / 5.0 if rating else 0
                
#                 # Calculate price factor (0-1 range)
#                 budget_range = float(preferences['budget_max'] - preferences['budget_min'])
#                 if budget_range > 0:
#                     budget_midpoint = float(preferences['budget_min']) + (budget_range / 2)
#                     price = float(tour.price_per_person)
#                     price_factor = 1.0 - (abs(price - budget_midpoint) / (budget_range / 2))
#                     price_factor = max(0, min(1, price_factor))
#                 else:
#                     price_factor = 0.5
                
#                 # Weighted combination of normalized scores (weights sum to 1.0)
#                 final_score = (0.6 * content_score) + (0.3 * rating_score) + (0.1 * price_factor)
#             else:
#                 # For content-based method, just use content score
#                 final_score = content_score

#             # Final normalization and conversion to percentage
#             # This guarantees a score between 0-100
#             percentage_score = round(min(1.0, max(0.0, final_score)) * 100)
            
#             results.append({
#                 'tour': tour,
#                 'score': percentage_score
#             })

#         logger.info("✅ Scoring complete. Preparing final recommendation list.")

#         # Sort by score and format
#         sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)[:10]
        
#         # ENHANCEMENT: Ensure diversity in top recommendations
#         top_tour_types = set()
#         final_results = []
        
#         # First pass: add highest scoring tour of each type
#         for item in sorted_results:
#             tour_type = item['tour'].tour_type
#             if tour_type not in top_tour_types and len(final_results) < 5:
#                 top_tour_types.add(tour_type)
#                 final_results.append(item)
        
#         # Second pass: fill remaining slots with highest scores regardless of type
#         for item in sorted_results:
#             if item not in final_results and len(final_results) < 10:
#                 final_results.append(item)
        
#         recommendations = [
#             format_tour_response(item['tour'], request, item['score'])
#             for item in final_results
#         ]

#         logger.info(f"✅ Returning {len(recommendations)} recommendations.")

#         return Response({
#             'recommendations': recommendations,
#             'method_used': method
#         })

#     except Exception as e:
#         logger.exception("🚨 Unexpected error during recommendation process:")
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# def format_tour_response(tour, request, score=None):
#     """Format tour data for API response"""
#     response = {
#         'id': str(tour.id),  # Convert UUID to string
#         'title': tour.title,
#         'description': tour.description[:100] + '...' if len(tour.description) > 100 else tour.description,
#         'price_per_person': float(tour.price_per_person),  # Convert Decimal to float
#         'price': float(tour.price_per_person),  # Add price alias for frontend
#         'location': tour.location,
#         'tour_type': tour.tour_type,
#         'duration': tour.duration,
#         'company': tour.company.username,
#     }
    
#     # Add match score if provided - now as integer out of 100
#     if score is not None:
#         response['match_score'] = score  # Now returns as integer 0-100
        
#         # ENHANCEMENT: Added match level label for user-friendly display
#         if score >= 90:
#             response['match_level'] = 'Perfect Match'
#         elif score >= 75:
#             response['match_level'] = 'Excellent Match'
#         elif score >= 60:
#             response['match_level'] = 'Good Match'
#         elif score >= 40:
#             response['match_level'] = 'Fair Match'
#         else:
#             response['match_level'] = 'Basic Match'
    
#     # Add image URL if available
#     if tour.main_image and hasattr(tour.main_image, 'url'):
#         response['image'] = request.build_absolute_uri(tour.main_image.url)
    
#     # ENHANCEMENT: Add tags to response for better frontend display
#     response['tags'] = list(tour.tags.values_list('name', flat=True))
        
#     return response