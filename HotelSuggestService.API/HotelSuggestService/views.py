import requests
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime
from serpapi import GoogleSearch

@swagger_auto_schema(
    operation_description='Get hotels in a specific location.',
    responses={
        200: 'OK',
        400: 'Bad Request (e.g., invalid date format)',
        500: 'Internal Server Error (e.g., API error)',
    }
)
def get_hotels(request, city, startDate, endDate):

    # Validate request parameters
    try:
        # Assuming format YYYY-MM-DD (adjust if needed)
        startDate = datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.strptime(endDate, '%Y-%m-%d')
    except ValueError:
        return JsonResponse({'error': 'Invalid date format. Please use YYYY-MM-DD.'}, status=400)

    # Construct search parameters based on request parameters
    params = {
        "engine": "google_hotels",
        "q": f"{city} hotels",  # Use city from request
        "check_in_date": startDate,
        "check_out_date": endDate,
        "adults": "2",  # Adjust as needed
        "currency": "USD",  # Adjust as needed
        "gl": "us",  # Adjust as needed
        "hl": "en",  # Adjust as needed
        "api_key": "1cab4e7d0d946f7098aae7c4641ee68330f30a879dd7d2eb6324e8ae92d4d320",  # Replace with your actual API key
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        #return JsonResponse("dancho", safe=False)
        return JsonResponse(results)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching hotel data: {e}")
        return JsonResponse({'error': 'Internal server error. Please try again later.'}, status=500)

