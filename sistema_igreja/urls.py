from django.contrib import admin
from django.urls import path, include  # Importação de 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),  # Incluindo os URLs da app 'usuarios'
]