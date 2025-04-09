# core/recommendations.py
from django.db.models import Q
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from .models import Tour, UserTourPreference

def recommend_tours(user_preferences):
    # 1. Hard Filtering (Budget, Type, Location, Group Size)
    tours = Tour.objects.filter(
        price_per_person__gte=user_preferences.budget_min,
        price_per_person__lte=user_preferences.budget_max,
        tour_type__in=user_preferences.preferred_tour_types,
        location__in=user_preferences.preferred_locations
    )
    
    if user_preferences.group_size:
        tours = tours.filter(
            min_group_size__lte=user_preferences.group_size,
            max_group_size__gte=user_preferences.group_size
        )

    # 2. TF-IDF Vectorization (Soft Matching)
    tour_descriptions = [f"{t.title} {t.description} {' '.join(t.tags.values_list('name', flat=True))}" for t in tours]
    user_query = " ".join(user_preferences.preferred_tour_types + user_preferences.preferred_locations)
    
    vectorizer = TfidfVectorizer()
    desc_vectors = vectorizer.fit_transform(tour_descriptions)
    user_vector = vectorizer.transform([user_query])
    
    similarities = cosine_similarity(user_vector, desc_vectors).flatten()
    
    # 3. Hybrid Scoring
    recommended = []
    for idx, tour in enumerate(tours):
        company_score = tour.company.company_profile.average_rating if hasattr(tour.company, 'company_profile') else 0
        hybrid_score = (0.7 * similarities[idx]) + (0.3 * company_score)
        recommended.append({
            'tour': tour,
            'score': hybrid_score,
            'match_percentage': int(hybrid_score * 100)
        })
    
    return sorted(recommended, key=lambda x: x['score'], reverse=True)[:10]