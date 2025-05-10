from django.contrib import admin
from django.urls import path, include  # Importação de 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),  # Incluindo os URLs da app 'usuarios'
    path('api/usuario/', include('usuarios.urls')),  # Incluindo os URLs da app 'usuarios' novamente (opcional, dependendo da estrutura do projeto)
]