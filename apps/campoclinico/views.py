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

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Estudiante creado correctamente", "student": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"error": "Error al crear el estudiante", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


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


# API for Assigning a Student to a Place
class AssignStudentToPlaceView(APIView):
    def post(self, request):
        try:
            place_id = request.data.get('place_id')
            student_id = request.data.get('student_id')
            place = ClinicFieldPlaces.objects.get(pk=place_id)

            if place.student:
                return Response(
                    {"error": "El cupo ya tiene un estudiante asignado."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            student = Student.objects.get(pk=student_id)
            place.student = student
            place.is_place_available = False
            place.save()

            return Response(
                {"message": f"Estudiante {student.name} asignado al cupo correctamente."},
                status=status.HTTP_200_OK
            )
        except ClinicFieldPlaces.DoesNotExist:
            return Response(
                {"error": "Cupo no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Student.DoesNotExist:
            return Response(
                {"error": "Estudiante no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )


# API for Unassigning a Student from a Place
class UnassignStudentFromPlaceView(APIView):
    def post(self, request):
        try:
            place_id = request.data.get('place_id')
            place = ClinicFieldPlaces.objects.get(pk=place_id)

            if not place.student:
                return Response(
                    {"error": "El cupo no tiene un estudiante asignado."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            place.student = None
            place.is_place_available = True
            place.save()

            return Response(
                {"message": "Estudiante desvinculado del cupo correctamente."},
                status=status.HTTP_200_OK
            )
        except ClinicFieldPlaces.DoesNotExist:
            return Response(
                {"error": "Cupo no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
            
class ClinicFieldPlacesView(APIView):
    def get(self, request):
        places = ClinicFieldPlaces.objects.all()
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(places, request)
        serializer = ClinicFieldPlacesSerializer(results, many=True)
        return paginator.get_paginated_response({'places': serializer.data})

    def post(self, request):
        """
        Método para crear un nuevo ClinicFieldPlace.
        """
        serializer = ClinicFieldPlacesSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Cupo creado correctamente", "place": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"error": "Error al crear el cupo", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

class PlacesByUniversityView(APIView):
    """
    Vista para obtener los cupos asociados a una universidad específica.
    """
    def get(self, request, university_id):
        try:
            # Validar que la universidad existe
            university = University.objects.get(pk=university_id)
            
            # Filtrar los cupos
            places = ClinicFieldPlaces.objects.filter(
                subject__semester__career__university=university
            )
            
            # Serializar los resultados
            serializer = ClinicFieldPlacesSerializer(places, many=True)
            
            return Response({"places": serializer.data}, status=status.HTTP_200_OK)
        except University.DoesNotExist:
            return Response(
                {"error": "Universidad no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

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

class StudentsBySubjectView(APIView):
    """
    Vista para obtener estudiantes que pertenecen a un ramo específico.
    """
    def get(self, request, subject_id):
        try:
            # Filtrar estudiantes que están inscritos en el semestre del ramo
            students = Student.objects.filter(semester__subject__id=subject_id)
            
            # Serializar los estudiantes
            serializer = StudentSerializer(students, many=True)
            
            return Response({"students": serializer.data}, status=status.HTTP_200_OK)
        except Subject.DoesNotExist:
            return Response(
                {"error": "Ramo no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
            
class SubjectsByUniversityView(APIView):
    """
    Vista para obtener las asignaturas (subjects) asociadas a una universidad específica.
    """
    def get(self, request, university_id):
        try:
            # Validar que la universidad existe
            university = University.objects.get(pk=university_id)
            
            # Filtrar las asignaturas por la universidad
            subjects = Subject.objects.filter(
                semester__career__university=university
            ).distinct()

            # Serializar las asignaturas
            serializer = SubjectSerializer(subjects, many=True)

            return Response({"subjects": serializer.data}, status=status.HTTP_200_OK)

        except University.DoesNotExist:
            return Response(
                {"error": "Universidad no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "Ha ocurrido un error inesperado.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class GetStudentsBySubjectView(APIView):
    def get(self, request, subject_id):
        try:
            subject = Subject.objects.get(id=subject_id)
            students = Student.objects.filter(semester=subject.semester)
            serialized_students = [
                {"id": student.id, "name": student.name, "last_name": student.last_name}
                for student in students
            ]
            return Response({"students": serialized_students}, status=status.HTTP_200_OK)
        except Subject.DoesNotExist:
            return Response({"error": "El ramo no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)