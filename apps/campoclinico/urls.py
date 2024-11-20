from django.urls import path
from .views import *

urlpatterns = [
    path('students/', StudentView.as_view(), name='students'),
    path('students/search/', SearchStudentView.as_view(), name='search_students'),
    path('places/assign/', AssignStudentToPlaceView.as_view(), name='assign_student_to_place'),
    path('places/unassign/', UnassignStudentFromPlaceView.as_view(), name='unassign_student_from_place'),
    path('universities/', UniversityView.as_view(), name='universities'),
    path('places/', Clinic_field_placesView.as_view(), name='places'),
    path('universities/search/', SearchUniversityView.as_view(), name='search_universities'),
    path('careers/', CareerView.as_view(), name='careers'),
    path('careers/search/', SearchCareerView.as_view(), name='search_careers'),
    path('test-api/', TestApiView.as_view(), name='test_api'),
]
