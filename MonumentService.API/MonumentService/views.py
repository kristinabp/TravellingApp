from django.http import JsonResponse
import requests

def get_monuments(request, city):
    api_key = 'kingerte'
    print(city)

    if city:
        endpoint_url = f'https://api.europeana.eu/record/v2/search.json?wskey={api_key}&query=where:({city})'
        try:
            response = requests.get(endpoint_url)
            
            if response.status_code == 200:
                data = response.json()
                return JsonResponse(data)
            else:
                return JsonResponse({'error': 'Failed to fetch monuments'}, status=response.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': 'nishto ne stava'}, status=500)
    
    else:

        return JsonResponse({'error': 'Missing city parameter'}, status=400)
