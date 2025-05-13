from django.contrib import admin
from .models import Usuario
from django.contrib.auth.admin import UserAdmin

class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Informações adicionais', {'fields': ('genero', 'idade')}),
    )
    list_display = ('username', 'email', 'genero', 'idade', 'is_active', 'is_staff')

admin.site.register(Usuario, UsuarioAdmin)
