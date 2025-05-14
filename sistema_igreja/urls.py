from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({'mensagem': 'API da Igreja - Backend Online'})

urlpatterns = [
    path('', home),  # rota raiz
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),  # Incluindo TODAS as URLs da app 'usuarios', incluindo os endpoints de membros
]