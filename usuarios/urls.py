from django.urls import path
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import usuario_me
from .views import test_view
from .views import dashboard_view


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', usuario_me, name='usuario_me'),
    path('test/', test_view, name='test'),  # <<< alterado aqui
    # ... outras rotas
    path('dashboard/', dashboard_view, name='dashboard'),
]
