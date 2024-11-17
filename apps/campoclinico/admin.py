from django.contrib import admin
from .models import (University, Career, Semester, Subject, Student, 
                     Clinic_field_intitution, Clinic_field_unity, Clinic_field_places)

admin.site.register(University)
admin.site.register(Career)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(Student)
admin.site.register(Clinic_field_intitution)
admin.site.register(Clinic_field_unity)
admin.site.register(Clinic_field_places)
