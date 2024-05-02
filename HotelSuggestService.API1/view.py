import requests
from django.http import JsonResponse

def get_hotels(request):
    api_key = 'YOUR_API_KEY'
    base_url = 'https://api.hotelbeds.com/hotels'

    try:
        response = requests.get(base_url, headers={'Api-Key': api_key})
        response.raise_for_status()
        hotels_data = response.json()
        return JsonResponse(hotels_data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Failed to fetch hotels'}, status=500)
