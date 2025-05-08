# pricing_utils.py

import requests
from datetime import datetime
from django.conf import settings

BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

def get_weather_data(location):
    """Fetch weather data for a given location."""
    try:
        params = {
            "q": location,
            "appid": settings.OPENWEATHER_API_KEY,
            # "units": "metric"
        }
        response = requests.get(BASE_URL, params=params, timeout=5)
        data = response.json()
        if data.get("cod") != 200:
            return None
        return {
            "temp": data["main"]["temp"],
            "lat": data["coord"]["lat"],
            "lon": data["coord"]["lon"]
        }
    except requests.RequestException:
        return None

def get_lat_lon_from_weather(location):
    """Fetch latitude and longitude for a given location using OpenWeatherMap."""
    weather_data = get_weather_data(location)
    if weather_data:
        return weather_data["lat"], weather_data["lon"]
    return None, None

def calculate_dynamic_price(base_price, location, tour_date):
    """Calculate dynamic price based on weather, season, and availability."""
    # 1) Weather factor
    weather_data = get_weather_data(location)
    if weather_data:
        temp_k = weather_data["temp"]
        # example: if < 15°C (288K), +20%; else no change
        weather_factor = 1.2 if temp_k < 288 else 1.0
    else:
        weather_factor = 1.0

    # 2) Seasonality factor
    month = datetime.strptime(str(tour_date), "%Y-%m-%d").month
    if month in (9,10,12, 1, 2):    season_factor = 1.3
    elif month in (6, 7, 8):   season_factor = 1.2
    else:                      season_factor = 1.0

    # 3) Availability factor (you can enhance this logic)
    availability_factor = 1.0

    dynamic_price = base_price * weather_factor * season_factor * availability_factor
    return round(dynamic_price, 2)


