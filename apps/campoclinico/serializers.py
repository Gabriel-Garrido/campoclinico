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
    university = UniversitySerializer()  # Incluye información de la universidad relacionada

    class Meta:
        model = Career
        fields = '__all__'


class SemesterSerializer(serializers.ModelSerializer):
    career = CareerSerializer()  # Incluye información de la carrera relacionada

    class Meta:
        model = Semester
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer()  # Incluye información del semestre relacionado

    class Meta:
        model = Subject
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer()  # Incluye información del semestre relacionado
    career = CareerSerializer()  # Incluye información de la carrera relacionada

    class Meta:
        model = Student
        fields = '__all__'


class ClinicFieldInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicFieldIntitution
        fields = '__all__'


class ClinicFieldUnitySerializer(serializers.ModelSerializer):
    ClinicFieldIntitution = ClinicFieldInstitutionSerializer()  # Incluye información de la institución relacionada

    class Meta:
        model = ClinicFieldUnity
        fields = '__all__'


class ClinicFieldPlacesSerializer(serializers.ModelSerializer):
    ClinicFieldUnity = ClinicFieldUnitySerializer()  # Incluye información de la unidad clínica relacionada
    subject = SubjectSerializer()  # Incluye información de la asignatura relacionada
    student = StudentSerializer()  # Incluye información del estudiante relacionado, si existe

    class Meta:
        model = ClinicFieldPlaces
        fields = '__all__'
