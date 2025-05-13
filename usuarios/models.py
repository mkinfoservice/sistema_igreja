from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    groups = models.ManyToManyField('auth.Group', related_name='usuario_groups', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='usuario_permissions', blank=True)
    GENERO_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('O', 'Outro'),
        ('N', 'Prefere não informar'),
    )

    genero = models.CharField(max_length=1, choices=GENERO_CHOICES, default='N')
    idade = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.username
