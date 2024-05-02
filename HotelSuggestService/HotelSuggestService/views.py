import requests
from django.http import JsonResponse

def get_hotels(request):
    api_key = 'adddaefeab19df6a85ecaef2c266799b'
    base_url = 'https://api.hotelbeds.com/hotel-api/1.0/hotels'

    params = {
        'cityCode': 'PAR',  # Paris city code
        # Add other parameters as needed
    }
    headers = {
        'Api-Key': api_key,
        'Accept': 'application/json'
    }

    try:
        response = requests.get(base_url, params=params, headers=headers)
        response.raise_for_status()
        hotels_data = response.json()
        return JsonResponse(hotels_data)  # Return JsonResponse instead of None
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Failed to fetch hotels'}, status=500)
