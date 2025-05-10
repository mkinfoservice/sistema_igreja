from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from usuarios.models import Usuario
from django.db.models import Count
from datetime import date

class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_membros = Usuario.objects.count()
        ativos = Usuario.objects.filter(is_active=True).count()
        inativos = Usuario.objects.filter(is_active=False).count()

        por_genero = Usuario.objects.values('gender').annotate(total=Count('id'))
        
        hoje = date.today()
        por_faixa_etaria = {
            '0-17': Usuario.objects.filter(date_of_birth__gte=hoje.replace(year=hoje.year-17)).count(),
            '18-30': Usuario.objects.filter(date_of_birth__lte=hoje.replace(year=hoje.year-18), date_of_birth__gte=hoje.replace(year=hoje.year-30)).count(),
            '31-60': Usuario.objects.filter(date_of_birth__lte=hoje.replace(year=hoje.year-31), date_of_birth__gte=hoje.replace(year=hoje.year-60)).count(),
            '60+': Usuario.objects.filter(date_of_birth__lte=hoje.replace(year=hoje.year-61)).count(),
        }

        return Response({
            "total": total_membros,
            "ativos": ativos,
            "inativos": inativos,
            "por_genero": list(por_genero),
            "por_faixa_etaria": por_faixa_etaria
        })