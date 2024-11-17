# campoclinico/serializers.py

from rest_framework import serializers
from .models import (
    University, Career, Semester, Subject, Student,
    Clinic_field_intitution, Clinic_field_unity, Clinic_field_places
)

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ClinicFieldInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic_field_intitution
        fields = '__all__'

class ClinicFieldUnitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic_field_unity
        fields = '__all__'

class ClinicFieldPlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic_field_places
        fields = '__all__'
