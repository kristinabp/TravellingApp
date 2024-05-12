import requests
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from serpapi import GoogleSearch

class PutEndpoint(APIView):
    city = None
    startDate = None
    endDate = None

    @swagger_auto_schema(
        operation_description='Save parameters.',
        responses={200: 'OK', 400: 'Bad Request', 500: 'Internal Server Error'}
    )
    def put_hotels(self, request, format=None):
        self.city = request.data.get('city')
        self.startDate = request.data.get('startDate')
        self.endDate = request.data.get('endDate')

        PutEndpoint.city = self.city
        PutEndpoint.startDate = self.startDate
        PutEndpoint.endDate = self.endDate

        return JsonResponse({'message': 'Parameters saved successfully.'})

    @swagger_auto_schema(
        operation_description='Get hotels in a specific location.',
        responses={200: 'OK', 400: 'Bad Request', 500: 'Internal Server Error'}
    )
    def get_hotels(self, request, format=None):
        city = self.city
        startDate = self.startDate
        endDate = self.endDate

        params = {
            "engine": "google_hotels",
            "q": "Bali Resorts",
            "check_in_date": "2024-05-11",
            "check_out_date": "2024-05-12",
            "adults": "2",
            "currency": "USD",
            "gl": "us",
            "hl": "en",
            "api_key": "1cab4e7d0d946f7098aae7c4641ee68330f30a879dd7d2eb6324e8ae92d4d320"
        }

        search = GoogleSearch(params)
        results = search.get_dict()

        print(results)
        return JsonResponse(results)