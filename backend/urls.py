from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from usuarios.views import MembroViewSet

def home(request):
    return JsonResponse({'mensagem': 'API da Igreja - Backend Online'})

# Cria o router global
router = DefaultRouter()
router.register(r'membros', MembroViewSet, basename='membro')

urlpatterns = [
    path('', home),  # rota raiz
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),  # Incluindo TODAS as URLs da app 'usuarios', incluindo os endpoints de membros
    path('api/', include(router.urls)),
]