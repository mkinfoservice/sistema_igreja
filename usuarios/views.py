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
    """
    View do Dashboard - Retorna métricas e estatísticas da igreja
    
    Retorna dados de:
    - Usuários do sistema (administradores)
    - Membros cadastrados (congregação)
    - Distribuição por gênero
    - Faixas etárias
    - Status (ativos/inativos)
    """
    # Dados de Usuários (administradores do sistema)
    users = Usuario.objects.all()
    total_usuarios = users.count()
    usuarios_ativos = users.filter(is_active=True).count()
    usuarios_inativos = total_usuarios - usuarios_ativos

    # Dados de Membros (congregação)
    membros = Membro.objects.all()
    total_membros = membros.count()
    membros_ativos = membros.filter(ativo=True).count()
    membros_inativos = membros.filter(ativo=False).count()
    membros_batizados = membros.filter(batizado=True).count()

    # Contagem de membros por gênero
    membros_por_genero = membros.values('genero').annotate(total=Count('genero'))
    
    # Mapear códigos de gênero para nomes
    genero_map = {
        'M': 'Masculino',
        'F': 'Feminino',
        'O': 'Outro',
        'N': 'Prefere não informar'
    }
    membros_por_genero_formatado = [
        {
            'genero': genero_map.get(item['genero'], item['genero']),
            'codigo': item['genero'],
            'total': item['total']
        }
        for item in membros_por_genero
    ]

    # Faixas etárias dos membros
    membros_por_faixa_etaria = {
        '0-17': membros.filter(idade__lte=17).count(),
        '18-25': membros.filter(idade__gte=18, idade__lte=25).count(),
        '26-35': membros.filter(idade__gte=26, idade__lte=35).count(),
        '36-50': membros.filter(idade__gte=36, idade__lte=50).count(),
        '51+': membros.filter(idade__gte=51).count()
    }

    # Membros por ministério
    membros_por_ministerio = membros.exclude(ministerio__isnull=True).exclude(ministerio='').values('ministerio').annotate(total=Count('ministerio')).order_by('-total')[:10]

    # Membros cadastrados nos últimos 30 dias
    from django.utils import timezone
    from datetime import timedelta
    trinta_dias_atras = timezone.now() - timedelta(days=30)
    membros_recentes = membros.filter(criado_em__gte=trinta_dias_atras).count()

    return Response({
        # Dados de usuários (sistema)
        'usuarios': {
            'total': total_usuarios,
            'ativos': usuarios_ativos,
            'inativos': usuarios_inativos
        },
        # Dados de membros (congregação)
        'membros': {
            'total': total_membros,
            'ativos': membros_ativos,
            'inativos': membros_inativos,
            'batizados': membros_batizados,
            'recentes_30_dias': membros_recentes
        },
        # Estatísticas
        'por_genero': membros_por_genero_formatado,
        'por_faixa_etaria': membros_por_faixa_etaria,
        'por_ministerio': list(membros_por_ministerio)
    })


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer