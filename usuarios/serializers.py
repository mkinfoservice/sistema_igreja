from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Usuario  # <- não User
from rest_framework import serializers
from .models import Membro

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'is_superuser']

class MembroSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Membro
        fields = '__all__'
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = Usuario.USERNAME_FIELD  # <- username por padrão

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['id'] = user.id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'is_superuser': self.user.is_superuser,
        }
        return data
