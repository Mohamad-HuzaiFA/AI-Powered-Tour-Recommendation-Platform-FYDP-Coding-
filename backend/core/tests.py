
# Create your tests here.
from django.test import TestCase
from core.pricing_utils import calculate_dynamic_price

class PricingUtilsTest(TestCase):
    def test_seasonality_and_weather(self):
        # Mocking weather is a deeper step—here we just check season factor
        # For winter (Dec 20)
        price = calculate_dynamic_price(100, "Murree,PK", "2025-12-20")
        self.assertGreater(price, 100)  # must be higher in winter

        # For off-season (April 30)
        price2 = calculate_dynamic_price(100, "Karachi,PK", "2025-04-30")
        self.assertEqual(price2, 100)  # no season bump
