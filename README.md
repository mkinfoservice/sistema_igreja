
# Sistema Igreja

Sistema de gestão completo para igrejas, 100% em nuvem, com funcionalidades para cadastro de membros, dashboard analítico, controle financeiro, certificados, transmissões ao vivo e muito mais.

## Tecnologias Utilizadas
- **Backend:** Django, Django REST Framework
- **Frontend:** React, TailwindCSS
- **Banco de Dados:** SQLite (desenvolvimento), PostgreSQL (produção)
- **Deploy:** Railway (backend), Vercel (frontend)

## Funcionalidades Atuais

### ✅ Autenticação
- Login de usuário via JWT
- Modelo de usuário personalizado (`usuarios.Usuario`)
- Autenticação persistente com refresh automático

### ✅ Membros
- Cadastro de membros com todos os campos relevantes
- Listagem de membros com filtros
- Edição de membros com formulário dinâmico
- Integração com backend protegida por token JWT

### ✅ Dashboard
- Métricas de distribuição por gênero
- Faixa etária dos usuários cadastrados
- Dados analíticos para gestão geral

### ✅ Frontend Navegação
- Roteamento autenticado com `BrowserRouter` e `Routes`
- Controle de navegação com `useEffect` e tokens locais
- Componentes dinâmicos por rota:
  - `/` → Dashboard
  - `/membros` → Listagem de membros
  - `/membros/cadastrar` → Cadastro de novo membro
  - `/membros/editar/:id` → Edição de membro existente

## Estrutura do Projeto
```
sistema_igreja/
├── sistema_igreja/
│   ├── usuarios/         # App de autenticação e modelo de usuários
│   ├── membros/          # App de gestão de membros
│   └── dashboard/        # App com views e dados analíticos
├── frontend/
│   ├── components/
│   │   ├── CadastroMembro.jsx
│   │   ├── ListagemMembros.jsx
│   │   └── EditarMembro.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   └── App.jsx
```

## Como rodar localmente

### Backend (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## Status do Projeto
🚧 Em desenvolvimento — aproximadamente **50%** concluído

### Progresso por módulo:
- Autenticação: ✅ Completo
- Dashboard: ✅ Métricas básicas funcionando
- Módulo de Membros: ✅ Cadastro, Edição e Listagem concluídos
- Infraestrutura: ✅ Deploy local testado
- Painel de usuário e UI final: 🔄 Em desenvolvimento
- Certificados, Financeiro, Sala Virtual: 🔜 Próximas fases

## Contribuição
Pull requests são bem-vindos! Para mudanças maiores, abra uma issue para discussão prévia.

## Licença
Projeto desenvolvido como iniciativa educacional para gestão eclesiástica.
