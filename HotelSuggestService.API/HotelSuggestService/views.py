import requests
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view


@swagger_auto_schema(
    method='get',
    operation_description='Get hotels in a specific location.',
    responses={200: 'OK', 400: 'Bad Request', 500: 'Internal Server Error'}
)

@api_view(['GET'])
def get_hotels(request):
    endpoint_url = 'https://hotels4.p.rapidapi.com/locations/v3/search'

    params = {}
    headers = {}
    
    params['q'] = 'new york'
    params['locale'] = 'en_US'
    params['langid'] = '1033'
    params['siteid'] = '300000001'

    headers['X-RapidAPI-Key'] = '2ff55d3e02msh4797c8d69ef4fa1p11b7d3jsn288eceb75521'
    headers['X-RapidAPI-Host'] = 'hotels4.p.rapidapi.com'

    try:
        response = requests.get(endpoint_url, params=params, headers=headers)
        
        if response.status_code == 200:
            hotel_data = response.json()
            print(hotel_data)
            return JsonResponse(hotel_data)
        else:
            return JsonResponse({'error': 'Failed to fetch hotels'}, status=response.status_code)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'nishto ne stava'}, status=500)