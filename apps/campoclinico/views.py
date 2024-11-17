from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.db.models import Q
from .models import *
from .serializers import *
from .pagination import *

# General API for Students
class StudentView(APIView):
    def get(self, request):
        students = Student.objects.all()
        paginator = MediumSetPagination()
        results = paginator.paginate_queryset(students, request)
        serializer = StudentSerializer(results, many=True)
        return paginator.get_paginated_response({'students': serializer.data})

# Search API for Students
class SearchStudentView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        search_term = request.query_params.get('s', '')
        matches = Student.objects.filter(
            Q(rut__icontains=search_term) |
            Q(name__icontains=search_term) |
            Q(last_name__icontains=search_term)
        )
        paginator = MediumSetPagination()
        results = paginator.paginate_queryset(matches, request)
        serializer = StudentSerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_students': serializer.data})


# API for Universities
class UniversityView(APIView):
    def get(self, request):
        universities = University.objects.all()
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(universities, request)
        serializer = UniversitySerializer(results, many=True)
        return paginator.get_paginated_response({'universities': serializer.data})


# API for Searching Universities
class SearchUniversityView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        search_term = request.query_params.get('s', '')
        matches = University.objects.filter(
            Q(university_name__icontains=search_term) |
            Q(campus_name__icontains=search_term)
        )
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)
        serializer = UniversitySerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_universities': serializer.data})


# General API for Careers
class CareerView(APIView):
    def get(self, request):
        careers = Career.objects.all()
        paginator = MediumSetPagination()
        results = paginator.paginate_queryset(careers, request)
        serializer = CareerSerializer(results, many=True)
        return paginator.get_paginated_response({'careers': serializer.data})


# Search API for Careers
class SearchCareerView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        search_term = request.query_params.get('s', '')
        matches = Career.objects.filter(
            Q(career_name__icontains=search_term) |
            Q(career_secretary_name__icontains=search_term)
        )
        paginator = MediumSetPagination()
        results = paginator.paginate_queryset(matches, request)
        serializer = CareerSerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_careers': serializer.data})


# Test API for functionality
class TestApiView(APIView):
    def get(self, request):
        data = {"message": "API funcionando correctamente"}
        return Response(data, status=status.HTTP_200_OK)
