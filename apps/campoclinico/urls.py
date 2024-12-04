from django.urls import path
from .views import *

urlpatterns = [
    path('students/', StudentView.as_view(), name='students'),
    path('students/search/', SearchStudentView.as_view(), name='search_students'),
    path('places/assign/', AssignStudentToPlaceView.as_view(),
         name='assign_student_to_place'),
    path('places/unassign/', UnassignStudentFromPlaceView.as_view(),
         name='unassign_student_from_place'),
    path('universities/', UniversityView.as_view(), name='universities'),
    path('places/', ClinicFieldPlacesView.as_view(), name='places'),
    path('places/university/<int:university_id>/',
         PlacesByUniversityView.as_view(), name='places_by_university'),
    path('universities/search/', SearchUniversityView.as_view(),
         name='search_universities'),
    path('careers/', CareerView.as_view(), name='careers'),
    path('careers/search/', SearchCareerView.as_view(), name='search_careers'),
    path('test-api/', TestApiView.as_view(), name='test_api'),
    path('students/by_subject/<int:subject_id>/',
         StudentsBySubjectView.as_view(), name='students_by_subject'),
    path('subjects_by_university/<int:university_id>/',
         SubjectsByUniversityView.as_view(), name='subjects_by_university'),
    path('students_by_subject/<int:subject_id>/',
         GetStudentsBySubjectView.as_view(), name='students_by_subject'),
    path(
        "careers_by_university/<int:university_id>/",
        CareersByUniversityView.as_view(),
        name="careers_by_university",
    ),
    path(
        "semesters_by_career/<int:career_id>/",
        SemestersByCareerView.as_view(),
        name="semesters_by_career",
    ),
    path(
        "students_by_career_semester/<int:career_id>/<int:semester_id>/",
        StudentsByCareerSemesterView.as_view(),
        name="students_by_career_semester",
    ),

]
