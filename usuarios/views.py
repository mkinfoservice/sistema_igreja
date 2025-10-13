from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets  # Adicionei esta importação
from .serializers import CustomTokenObtainPairSerializer, UsuarioSerializer, MembroSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Count
from .models import Usuario, Membro


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_me(request):
    usuario = request.user
    serializer = UsuarioSerializer(usuario)
    return Response(serializer.data)


class MembroViewSet(viewsets.ModelViewSet):
    queryset = Membro.objects.all().order_by('-criado_em')
    serializer_class = MembroSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
def test_view(request):
    return JsonResponse({'mensagem': 'Backend acessível com CORS OK'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_view(request):
    users = Usuario.objects.all()

    total = users.count()
    ativos = users.filter(is_active=True).count()
    inativos = total - ativos

    # Contagem por gênero
    por_genero = users.values('genero').annotate(total=Count('genero'))

    # Faixas etárias
    # Nota: Verifique se o campo 'idade' existe no seu modelo Usuario
    por_faixa_etaria = {
        '0-17': users.filter(idade__lte=17).count(),
        '18-25': users.filter(idade__gte=18, idade__lte=25).count(),
        '26-35': users.filter(idade__gte=26, idade__lte=35).count(),
        '36-50': users.filter(idade__gte=36, idade__lte=50).count(),
        '51+': users.filter(idade__gte=51).count()
    }

    return Response({
        'total': total,
        'ativos': ativos,
        'inativos': inativos,
        'por_genero': list(por_genero),
        'por_faixa_etaria': por_faixa_etaria
    })


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer