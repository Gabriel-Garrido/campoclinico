from django.db import models

class University(models.Model):
    university_name = models.CharField(max_length=50, unique=False)
    university_rut = models.CharField(max_length=50, unique=False)
    campus_name = models.CharField(max_length=50, unique=False)
    campus_address = models.CharField(max_length=50, unique=False)
    
    def __str__(self):
        return self.university_name

class Career(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    career_name = models.CharField(max_length=50, unique=True)
    career_secretary_name = models.CharField(max_length=50, unique=True)
    duration_years = models.PositiveIntegerField()
    
    def __str__(self):
        return f'{self.career_name} {self.university.university_name}'
    
class Semester(models.Model):
    semester_number = models.PositiveIntegerField() 
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    career_year = models.PositiveIntegerField()  #'hace referencia al año de la carrera en que esta el semestre, ej: '1, 2,3, etc' , por ejemplo el tercer semestre es del año 2
    academic_year = models.PositiveIntegerField() #hace reerencia al año segun calendario, ej '2024, 2025, etc'
    
    def __str__(self):
        return f'{self.semester_number} {self.career.career_name}'
    
class Subject(models.Model):
    INTERNSHIP_CHOICES = [
        ('curricular', 'Curricular'),
        ('internado', 'Internado')
    ]
    subject_name = models.CharField(max_length=50, unique=True)
    nrc = models.CharField(max_length=50, unique=False)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    type_of_internship = models.CharField(max_length=30, choices=INTERNSHIP_CHOICES, default=None)
    total_required_hours = models.FloatField(null=False)
    
    def __str__(self):
        return f'{self.subject_name}'
    
class Student(models.Model):
    
    name = models.CharField(max_length=50, unique=False)
    last_name = models.CharField(max_length=50, unique=False)
    second_last_name = models.CharField(max_length=50, unique=False)
    rut = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=15, unique=False)
    email = models.EmailField(max_length=50, unique=True)
    emergency_name = models.CharField(max_length=50, unique=False)
    emergency_number = models.CharField(max_length=15, unique=False)
    student_address = models.CharField(max_length=100, unique=False)
    observation = models.TextField(max_length=500)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.name} {self.last_name}'
    
    class Meta:
        unique_together = ('rut', 'career')

class ClinicFieldIntitution(models.Model):
    intitution_name = models.CharField(max_length=50, unique=False)
    institution_branch_name = models.CharField(max_length=50, unique=False, null=True)
    clinic_field_code = models.CharField(max_length=50, unique=False)
    clinic_field_address = models.CharField(max_length=50, unique=False)
    clinic_field_rut = models.CharField(max_length=50, unique=False)
    clinic_field_razon_social = models.CharField(max_length=50, unique=False)
    is_clinic_field_agreement_active = models.BooleanField(default=True, null=False)
    
    def __str__(self):
        return f'{self.intitution_name} | sede: {self.institution_branch_name}'
        
class ClinicFieldUnity(models.Model):
    ClinicFieldUnity_name = models.CharField(max_length=50, unique=False)
    ClinicFieldIntitution = models.ForeignKey(ClinicFieldIntitution, on_delete=models.CASCADE, null=False)
    
    def __str__(self):
        return f'{self.ClinicFieldUnity_name} {self.ClinicFieldIntitution.intitution_name}'
    
    
class ClinicFieldPlaces(models.Model):
    ClinicFieldUnity = models.ForeignKey(ClinicFieldUnity, on_delete=models.CASCADE, null=False)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=False)
    student = models.ForeignKey(Student, null=True, default=None, on_delete=models.CASCADE) 
    teacher_name = models.CharField(max_length=50, unique=False)
    start_time = models.TimeField()
    end_time = models.TimeField()
    date = models.DateField()   #fecha, se creara una fila por cada dia por cada cupo, con alumno en null, que luego se podra llenar con los alumnos que asistiran
    is_student_attended = models.BooleanField(null=True, default=None)   #asistencia del alumno
    is_place_available = models.BooleanField(null=True, default=None)   #disponibilidad del cupo, False puede ser porque ya esta inscrito un alumno o por motivos del campo clinico, por ejemplo 'pabellon esta cerrado'
    observation = models.CharField(max_length=50, unique=False)   
    
    def __str__(self):
        return f'{self.date} | {self.start_time} - {self.end_time}'
    
