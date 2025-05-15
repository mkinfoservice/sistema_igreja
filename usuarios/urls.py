from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomTokenObtainPairView,
    usuario_me,
    test_view,
    dashboard_view,
    MembroViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView

# Configurando o router
router = DefaultRouter()
router.register(r'membros', MembroViewSet, basename='membro')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', usuario_me, name='usuario_me'),
    path('test/', test_view, name='test'),
    path('dashboard/', dashboard_view, name='dashboard'),
    
   
]