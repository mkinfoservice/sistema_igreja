
# Sistema Igreja - Plataforma de Gestão 100% em Nuvem

Este projeto é uma solução completa para o gerenciamento de igrejas, com módulos essenciais como cadastro de membros, emissão de certificados, controle financeiro, sala virtual e mais. Ele utiliza tecnologias modernas para garantir desempenho, segurança e facilidade de uso.

## ✅ Tecnologias Utilizadas

### Backend:
- **Django**
- **Django Rest Framework**
- **Autenticação personalizada com `usuarios.User`**
- **SQLite (desenvolvimento) / PostgreSQL (produção futura)**
- **Deploy: Railway (previsto)**

### Frontend:
- **React 18**
- **TailwindCSS 3.4.7**
- **React Router DOM 7.6**
- **Chart.js e React-Chartjs-2**

---

## 📌 Status Atual do Projeto

### ✅ Concluído até agora:
- Estrutura base Django + React integrada
- Modelo de usuário personalizado configurado (`usuarios.User`)
- App `usuarios` e autenticação funcional
- Projeto React criado e funcionando com TailwindCSS 3.4.7
- Frontend já com layout inicial e dashboard básico em andamento
- Primeiros commits feitos e versionamento no Git iniciado

---

## 🚧 Etapas Pendentes

### Backend:
- [ ] Criar os módulos:
  - [ ] Cadastro de Membros
  - [ ] Emissão de Certificados
  - [ ] Relatórios e Gráficos
  - [ ] Gestão Financeira
  - [ ] Sala Virtual (com integração de live)
- [ ] Implementar testes automatizados
- [ ] Configurar banco PostgreSQL para produção

### Frontend:
- [ ] Interface de login e cadastro conectada ao backend
- [ ] Páginas para cada módulo
- [ ] Consumo da API Django com Axios
- [ ] Interface mobile-first responsiva

### Infra:
- [ ] Deploy do backend na Railway
- [ ] Deploy do frontend na Vercel
- [ ] Configuração do domínio e certificado SSL

---

## 🚀 Como Executar Localmente

### Backend (Django)
```bash
cd backend
python manage.py runserver
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

sistema_igreja/
├── backend/          # Projeto Django
├── frontend/         # Aplicação React com Tailwind
└── README.md

## 🧠 Contribuição e Sincronização (2 dispositivos)

- Faça `git clone` do repositório nas duas máquinas
- Use `git pull` e `git push` com frequência
- Faça commits claros e objetivos
- Use branches para novas features se necessário

---

Desenvolvido com 💻 por Maykon Douglas
