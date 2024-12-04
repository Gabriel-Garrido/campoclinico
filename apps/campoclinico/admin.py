from django.contrib import admin
from .models import (University, Career, Semester, Subject, Student, 
                     ClinicFieldInstitution, ClinicFieldUnity, ClinicFieldPlaces)

admin.site.register(University)
admin.site.register(Career)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(Student)
admin.site.register(ClinicFieldInstitution)
admin.site.register(ClinicFieldUnity)
admin.site.register(ClinicFieldPlaces)
