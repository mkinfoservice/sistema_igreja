
# Sistema Igreja - Plataforma Web Django + React

Este projeto é um sistema completo de gerenciamento para igrejas, com funcionalidades em desenvolvimento como:

- Cadastro de membros
- Certificados e relatórios
- Gestão financeira
- Sala virtual para transmissões ao vivo
- Sistema 100% em nuvem

## 📅 Linha do tempo do desenvolvimento

1. **Configuração Inicial (Django + React)**
2. **Criação de modelo de usuário customizado `usuarios.Usuario`**
3. **Integração JWT e autenticação protegida entre frontend e backend**
4. **Login funcional com Django + React**
5. **Criação de rotas protegidas e design de tela de login**
6. **Upload do projeto para GitHub e sincronização multi-dispositivo**
7. **[Status Atual]**: Projeto está sincronizado com GitHub, autenticação funcional, iniciando estilização e implementação de funcionalidades principais

## 🚀 Como rodar o projeto

### Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # Linux/Mac
env\Scripts\activate  # Windows

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

## 🧠 Contribuição e Sincronização (2 dispositivos)

- Faça `git clone` do repositório nas duas máquinas
- Use `git pull` e `git push` com frequência
- Faça commits claros e objetivos
- Use branches para novas features se necessário

---

Desenvolvido com 💻 por [Seu Nome]
