# usuarios/criar_usuarios.py

from django.contrib.auth import get_user_model

Usuario = get_user_model()

usuarios_dados = [
    {"username": "joao", "email": "joao@email.com", "password": "senha123", "genero": "M", "idade": 22, "is_active": True},
    {"username": "maria", "email": "maria@email.com", "password": "senha123", "genero": "F", "idade": 30, "is_active": True},
    {"username": "carlos", "email": "carlos@email.com", "password": "senha123", "genero": "M", "idade": 45, "is_active": False},
    {"username": "ana", "email": "ana@email.com", "password": "senha123", "genero": "F", "idade": 18, "is_active": True},
    {"username": "patricia", "email": "patricia@email.com", "password": "senha123", "genero": "O", "idade": 27, "is_active": True},
]

for dados in usuarios_dados:
    if not Usuario.objects.filter(username=dados["username"]).exists():
        user = Usuario.objects.create_user(
            username=dados["username"],
            email=dados["email"],
            password=dados["password"],
            genero=dados["genero"],
            idade=dados["idade"],
            is_active=dados["is_active"]
        )
        print(f"Usuário {user.username} criado com sucesso.")
    else:
        print(f"Usuário {dados['username']} já existe.")
