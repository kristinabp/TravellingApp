FROM python:3.9 as HotelSuggestService-build

WORKDIR ./

RUN pip install django
RUN pip install requests
RUN pip install drf-yasg

COPY ./ ./

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]