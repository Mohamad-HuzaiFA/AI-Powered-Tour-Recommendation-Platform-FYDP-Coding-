from django.core.management.base import BaseCommand
from core.models import Tour
from core.pricing_utils import get_lat_lon_from_weather  # Or pricing_utils if you kept the function there

class Command(BaseCommand):
    help = 'Updates the location and fetches coordinates for specific tours'

    def add_arguments(self, parser):
        parser.add_argument('tour_ids', nargs='+', type=str, help='List of UUIDs of the tours to update')
        parser.add_argument('--city', type=str, help='The Pakistani city to set as the new location', required=True)

    def handle(self, *args, **options):
        tour_ids = options['tour_ids']
        city = options['city']

        for tour_id_str in tour_ids:
            try:
                tour = Tour.objects.get(id=tour_id_str)
                tour.location = city
                lat, lon = get_lat_lon_from_weather(city)
                if lat and lon:
                    tour.latitude = lat
                    tour.longitude = lon
                    tour.save()
                    self.stdout.write(self.style.SUCCESS(f'Successfully updated location and coordinates for tour ID: {tour_id_str} to {city} ({lat}, {lon})'))
                else:
                    tour.latitude = None
                    tour.longitude = None
                    tour.save()
                    self.stdout.write(self.style.WARNING(f'Could not fetch coordinates for {city}. Location updated for tour ID: {tour_id_str}'))
            except Tour.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Tour with ID "{tour_id_str}" does not exist.'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'An error occurred while updating tour ID "{tour_id_str}": {e}'))

        self.stdout.write(self.style.SUCCESS('Update process completed.'))