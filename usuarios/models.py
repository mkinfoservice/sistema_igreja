from django.contrib.auth.models import AbstractUser
from django.db import models

GENERO_CHOICES = (
    ('M', 'Masculino'),
    ('F', 'Feminino'),
    ('O', 'Outro'),
    ('N', 'Prefere não informar'),
)

class Usuario(AbstractUser):
    groups = models.ManyToManyField('auth.Group', related_name='usuario_groups', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='usuario_permissions', blank=True)
    genero = models.CharField(max_length=1, choices=GENERO_CHOICES, default='N')
    idade = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.username


class Membro(models.Model):
    usuario_responsavel = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True)
    nome_completo = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    rg = models.CharField(max_length=20, blank=True, null=True)
    data_nascimento = models.DateField()
    endereco = models.TextField(blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    batizado = models.BooleanField(default=False)
    data_batismo = models.DateField(blank=True, null=True)
    ministerio = models.CharField(max_length=255, blank=True, null=True)
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    genero = models.CharField(max_length=1, choices=GENERO_CHOICES, default='N')
    idade = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.nome_completo
