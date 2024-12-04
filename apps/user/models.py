from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from ..campoclinico.models import University

# Definimos un manager personalizado para el modelo de usuario
class UserAccountManager(BaseUserManager):
    # Método para crear un usuario normal
    def create_user(self, email, password=None, **extra_fields):
        # Verifica que el email sea proporcionado
        if not email:
            raise ValueError('Users must have an email address')
        
        # Normaliza el email (por ejemplo, convierte mayúsculas a minúsculas)
        email = self.normalize_email(email)
        # Crea una instancia del modelo UserAccount
        user = self.model(email=email, **extra_fields)
        # Establece la contraseña del usuario
        user.set_password(password)
        # Guarda el usuario en la base de datos
        user.save()

        return user
    
    # Método para crear un superusuario (administrador)
    def create_superuser(self, email, password, **extra_fields):
        # Crea un usuario normal primero
        user = self.create_user(email, password, **extra_fields)
        # Establece el superusuario y el personal (staff)
        user.is_superuser = True
        user.is_staff = True
        # Guarda el superusuario en la base de datos
        user.save()

        return user

# Definimos el modelo de cuenta de usuario que extiende de AbstractBaseUser y PermissionsMixin
class UserAccount(AbstractBaseUser, PermissionsMixin):
    # Campo de correo electrónico, debe ser único
    email = models.EmailField(max_length=255, unique=True)
    # Campos para el nombre y apellido del usuario
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    university = models.ForeignKey(University, on_delete=models.CASCADE, null=True, blank=True)
    # Campo booleano para indicar si la cuenta está activa
    is_active = models.BooleanField(default=True)
    # Campo booleano para indicar si el usuario es parte del personal (staff)
    is_staff = models.BooleanField(default=False)
    # Campo booleano adicional, podría ser usado para permisos adicionales (como editor)
    is_editor = models.BooleanField(default=False)

    # Asocia el manager personalizado con el modelo
    objects = UserAccountManager()

    # Define que el campo usado para el login será el email
    USERNAME_FIELD = 'email'
    # Campos adicionales requeridos al crear un usuario
    REQUIRED_FIELDS = ['first_name', 'last_name']
    

    # Método para representar el modelo como una cadena
    def __str__(self):
        return self.email
