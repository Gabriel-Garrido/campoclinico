# campoclinico/serializers.py

from rest_framework import serializers
from .models import (
    University, Career, Semester, Subject, Student,
    ClinicFieldIntitution, ClinicFieldUnity, ClinicFieldPlaces
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
        model = ClinicFieldIntitution
        fields = '__all__'

class ClinicFieldUnitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicFieldUnity
        fields = '__all__'

class ClinicFieldPlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicFieldPlaces
        fields = '__all__'
