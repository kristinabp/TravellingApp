FROM python:3.9 as MonumentService-build

WORKDIR ./

RUN pip install django
RUN pip install requests
RUN pip install drf-yasg
RUN pip install django-cors-headers

COPY ./ ./

CMD ["python", "manage.py", "runserver", "0.0.0.0:8008"]