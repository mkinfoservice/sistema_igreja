from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UsuarioSerializer  # Criaremos esse serializer
from .models import Usuario

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_me(request):
    usuario = request.user
    serializer = UsuarioSerializer(usuario)
    return Response(serializer.data)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer