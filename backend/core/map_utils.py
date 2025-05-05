# map_utils.py

def get_static_map_url(lat, lon, size="650x450", zoom=12):
    return f"https://static-maps.yandex.ru/1.x/?ll={lon},{lat}&size={size}&z={zoom}&l=map"
