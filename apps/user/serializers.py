# Importamos el UserCreateSerializer de la librería Djoser, que es una extensión de los serializadores de Django REST Framework
from djoser.serializers import UserCreateSerializer
# Importamos el módulo de serializadores de Django REST Framework
from rest_framework import serializers

# Obtenemos el modelo de usuario definido en el proyecto (podría ser un modelo personalizado)
from django.contrib.auth import get_user_model
User = get_user_model()  # Esto obtiene el modelo de usuario actual

# Definimos un nuevo serializador para el usuario que extiende de UserCreateSerializer
class UserSerializer(UserCreateSerializer):
    # Definimos la clase Meta que especifica la configuración del serializador
    class Meta(UserCreateSerializer.Meta):
        # Especificamos el modelo que se va a utilizar (en este caso, el modelo de usuario)
        model = User
        # Especificamos los campos del modelo que se incluirán en el serializador
        fields = [
            'id',          # ID del usuario
            'email',       # Correo electrónico del usuario
            'first_name',  # Nombre del usuario
            'last_name',   # Apellido del usuario
            'is_active',   # Indica si la cuenta del usuario está activa
            'is_staff',    # Indica si el usuario es parte del personal (staff)
            'is_editor',   # Indica si el usuario tiene permisos adicionales, como editor
        ]
