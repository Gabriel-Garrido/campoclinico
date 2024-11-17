from django.urls import path
from .views import *

urlpatterns = [
    path('students/', StudentView.as_view(), name='students'),
    path('students/search/', SearchStudentView.as_view(), name='search_students'),
    path('universities/', UniversityView.as_view(), name='universities'),
    path('universities/search/', SearchUniversityView.as_view(), name='search_universities'),
    path('careers/', CareerView.as_view(), name='careers'),
    path('careers/search/', SearchCareerView.as_view(), name='search_careers'),
    path('test-api/', TestApiView.as_view(), name='test_api'),
]
