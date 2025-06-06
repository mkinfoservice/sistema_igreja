# Generated by Django 5.2.1 on 2025-05-15 14:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_usuario_genero_usuario_idade'),
    ]

    operations = [
        migrations.CreateModel(
            name='Membro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_completo', models.CharField(max_length=255)),
                ('cpf', models.CharField(max_length=14, unique=True)),
                ('rg', models.CharField(blank=True, max_length=20, null=True)),
                ('data_nascimento', models.DateField()),
                ('endereco', models.TextField(blank=True, null=True)),
                ('telefone', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('batizado', models.BooleanField(default=False)),
                ('data_batismo', models.DateField(blank=True, null=True)),
                ('ministerio', models.CharField(blank=True, max_length=255, null=True)),
                ('ativo', models.BooleanField(default=True)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateTimeField(auto_now=True)),
                ('genero', models.CharField(choices=[('M', 'Masculino'), ('F', 'Feminino'), ('O', 'Outro'), ('N', 'Prefere não informar')], default='N', max_length=1)),
                ('idade', models.PositiveIntegerField(blank=True, null=True)),
                ('usuario_responsavel', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
