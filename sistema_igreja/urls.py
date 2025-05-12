from django.contrib import admin
from django.urls import path, include  # Importação de 'include'
from django.http import JsonResponse

def home(request):
    return JsonResponse({'mensagem': 'API da Igreja - Backend Online'})

urlpatterns = [
    path('', home),  # rota raiz
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),  # Incluindo os URLs da app 'usuarios'
    path('api/usuario/', include('usuarios.urls')),  # Incluindo os URLs da app 'usuarios' novamente (opcional, dependendo da estrutura do projeto)
]