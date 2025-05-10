from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    groups = models.ManyToManyField('auth.Group', related_name='usuario_groups', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='usuario_permissions', blank=True)
