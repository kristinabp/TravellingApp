from django.http import JsonResponse
import requests

def get_monuments(request):
    api_key = 'kingerte'

    if request.method == 'POST':
        data = json.loads(request.body)
        city = data.get('city')
        print(city)
    else:
        city = "Paris"
    
    endpoint_url = f'https://api.europeana.eu/record/v2/search.json?wskey={api_key}&query="{city}"'

    try:
        response = requests.get(endpoint_url)
        
        if response.status_code == 200:
            data = response.json()
            return JsonResponse(data)
        else:
            return JsonResponse({'error': 'Failed to fetch monuments'}, status=response.status_code)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'nishto ne stava'}, status=500)
