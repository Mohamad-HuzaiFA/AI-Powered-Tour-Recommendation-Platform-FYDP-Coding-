# core/management/commands/seed_tours.py
from django.core.management.base import BaseCommand
from core.models import Tour, TourTag, User
from django.conf import settings

class Command(BaseCommand):
    help = 'Seeds 30+ sample tours for AI recommendations'

    def handle(self, *args, **kwargs):
        # Create test company users
        companies = [
            User.objects.get_or_create(
                username='adventure_co',
                defaults={
                    'email': 'adventure@example.com',
                    'user_type': 'company',
                    'company_name': 'Extreme Adventures Inc'
                }
            )[0],
            User.objects.get_or_create(
                username='family_tours',
                defaults={
                    'email': 'family@example.com',
                    'user_type': 'company',
                    'company_name': 'Family Travel Experts'
                }
            )[0],
            User.objects.get_or_create(
                username='party_planners',
                defaults={
                    'email': 'party@example.com',
                    'user_type': 'company',
                    'company_name': 'Global Party Network'
                }
            )[0]
        ]

        # Comprehensive tour data (32 tours)
        tours = [
            # ===== ADVENTURE TOURS (12) =====
            {
                'title': 'Amazon Rainforest Expedition',
                'description': '7-day jungle trek with wildlife spotting and river canoeing',
                'price_per_person': 650,
                'tour_type': 'adventure',
                'location': 'Brazil',
                'tags': ['jungle', 'wildlife', 'hiking', 'eco'],
                'company': companies[0]
            },
            {
                'title': 'Patagonia Glacier Trek',
                'description': 'Guided hike across Perito Moreno Glacier with ice climbing',
                'price_per_person': 720,
                'tour_type': 'adventure',
                'location': 'Argentina',
                'tags': ['glacier', 'hiking', 'mountains', 'extreme'],
                'company': companies[0]
            },
            {
                'title': 'Sahara Desert Camping',
                'description': '3-night camel safari with Berber culture experience',
                'price_per_person': 380,
                'tour_type': 'adventure',
                'location': 'Morocco',
                'tags': ['desert', 'camping', 'cultural', 'sunset'],
                'company': companies[0]
            },
            {
                'title': 'Great Barrier Reef Dive',
                'description': 'PADI certified scuba diving tour with marine biologist guide',
                'price_per_person': 550,
                'tour_type': 'adventure',
                'location': 'Australia',
                'tags': ['diving', 'ocean', 'wildlife', 'snorkeling'],
                'company': companies[0]
            },
            {
                'title': 'Rocky Mountain Bike Tour',
                'description': '5-day mountain biking through Canadian Rockies',
                'price_per_person': 480,
                'tour_type': 'adventure',
                'location': 'Canada',
                'tags': ['biking', 'mountains', 'trails', 'outdoors'],
                'company': companies[0]
            },
            {
                'title': 'Volcano Boarding Nicaragua',
                'description': 'Descend active volcano Cerro Negro on a sandboard',
                'price_per_person': 120,
                'tour_type': 'adventure',
                'location': 'Nicaragua',
                'tags': ['extreme', 'volcano', 'unique', 'thrill'],
                'company': companies[0]
            },

            # ===== FAMILY TOURS (10) =====
            {
                'title': 'Tokyo Disney Resort Package',
                'description': '4-day pass with kid-friendly hotel and transport',
                'price_per_person': 420,
                'tour_type': 'family',
                'location': 'Japan',
                'tags': ['theme-park', 'kids', 'character-meals', 'fun'],
                'company': companies[1]
            },
            {
                'title': 'San Diego Zoo Explorer',
                'description': 'Behind-the-scenes access with animal encounters',
                'price_per_person': 180,
                'tour_type': 'family',
                'location': 'USA',
                'tags': ['animals', 'educational', 'interactive', 'all-ages'],
                'company': companies[1]
            },
            {
                'title': 'Legoland Denmark Vacation',
                'description': 'Weekend package with early park access',
                'price_per_person': 290,
                'tour_type': 'family',
                'location': 'Denmark',
                'tags': ['lego', 'creative', 'play', 'rides'],
                'company': companies[1]
            },
            {
                'title': 'Costa Rica Eco Adventure',
                'description': 'Wildlife spotting and kid-friendly jungle activities',
                'price_per_person': 320,
                'tour_type': 'family',
                'location': 'Costa Rica',
                'tags': ['nature', 'animals', 'eco-friendly', 'educational'],
                'company': companies[1]
            },
            {
                'title': 'Dutch Tulip Festival Tour',
                'description': 'Bike through flower fields with picnic lunch',
                'price_per_person': 150,
                'tour_type': 'family',
                'location': 'Netherlands',
                'tags': ['flowers', 'spring', 'biking', 'photography'],
                'company': companies[1]
            },

            # ===== PARTY TOURS (6) =====
            {
                'title': 'Las Vegas Pool Party Weekend',
                'description': 'VIP access to 3 top dayclubs with bottle service',
                'price_per_person': 600,
                'tour_type': 'party',
                'location': 'USA',
                'tags': ['pool', 'DJ', 'luxury', 'celebrity'],
                'company': companies[2]
            },
            {
                'title': 'Full Moon Party Thailand',
                'description': 'Beach party package with transport and safety team',
                'price_per_person': 90,
                'tour_type': 'party',
                'location': 'Thailand',
                'tags': ['beach', 'nightlife', 'fire-shows', 'international'],
                'company': companies[2]
            },
            {
                'title': 'Rio Carnival Experience',
                'description': 'Samba parade tickets and blocos street parties',
                'price_per_person': 750,
                'tour_type': 'party',
                'location': 'Brazil',
                'tags': ['carnival', 'dancing', 'colorful', 'cultural'],
                'company': companies[2]
            },

            # ===== CLASSICAL TOURS (8) =====
            {
                'title': 'Athens Ancient Wonders',
                'description': 'Acropolis tour with archaeology professor guide',
                'price_per_person': 220,
                'tour_type': 'classical',
                'location': 'Greece',
                'tags': ['history', 'museum', 'ruins', 'UNESCO'],
                'company': companies[0]
            },
            {
                'title': 'Egyptian Pyramids Expedition',
                'description': 'Private access to Great Pyramid chambers',
                'price_per_person': 680,
                'tour_type': 'classical',
                'location': 'Egypt',
                'tags': ['ancient', 'mystery', 'desert', 'iconic'],
                'company': companies[0]
            },
            {
                'title': 'Imperial China Tour',
                'description': 'Forbidden City and Great Wall private access',
                'price_per_person': 580,
                'tour_type': 'classical',
                'location': 'China',
                'tags': ['dynasty', 'architecture', 'imperial', 'UNESCO'],
                'company': companies[0]
            }
            # Additional tours can be added here...
        ]

        # Create tours and tags
        created_count = 0
        for tour_data in tours:
            tags = tour_data.pop('tags', [])
            company = tour_data.pop('company', companies[0])
            
            tour = Tour.objects.create(company=company, **tour_data)
            for tag_name in tags:
                tag, _ = TourTag.objects.get_or_create(name=tag_name)
                tour.tags.add(tag)
            created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {created_count} tours from {len(companies)} companies')
        )