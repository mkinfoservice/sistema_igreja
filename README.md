# Sistema Igreja - Sistema de Gestão Eclesiástica

Sistema completo de gestão para igrejas desenvolvido com **Django REST Framework** (backend) e **React** (frontend), oferecendo funcionalidades para cadastro de membros, dashboard analítico, controle financeiro, certificados e muito mais.

---

## 📋 Índice

- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Estado Atual do Projeto](#estado-atual-do-projeto)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Funcionalidades Pendentes](#funcionalidades-pendentes)
- [Problemas Conhecidos](#problemas-conhecidos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Executar](#como-executar)
- [API Endpoints](#api-endpoints)
- [Próximos Passos](#próximos-passos)
- [Arquitetura](#arquitetura)

---

## 🛠️ Tecnologias

### Backend
- **Django 5.2.8** - Framework web Python
- **Django REST Framework 3.16.1** - API REST
- **djangorestframework-simplejwt 5.5.1** - Autenticação JWT
- **django-cors-headers 4.9.0** - CORS para comunicação frontend/backend
- **psycopg2-binary** - Driver PostgreSQL (preparado para produção)
- **SQLite** - Banco de dados em desenvolvimento

### Frontend
- **React 18.2.0** - Biblioteca JavaScript
- **React Router DOM 6.30.1** - Roteamento
- **Axios 1.9.0** - Cliente HTTP
- **TailwindCSS 3.4.7** - Framework CSS
- **Chart.js 4.4.9** + **react-chartjs-2 5.3.0** - Gráficos
- **lucide-react 0.545.0** - Ícones

---

## 📁 Estrutura do Projeto

```
sistema_igreja/
├── backend/                    # Configurações Django
│   ├── settings.py            # Configurações principais
│   ├── settings_jwt.py        # Configurações JWT (não utilizado atualmente)
│   ├── urls.py                # URLs principais
│   └── wsgi.py
│
├── usuarios/                   # App principal (usuários e membros)
│   ├── models.py              # Modelos: Usuario, Membro
│   ├── serializers.py         # Serializers para API
│   ├── views.py               # Views e ViewSets
│   ├── urls.py                # Rotas da API
│   ├── admin.py               # Admin Django
│   ├── api/
│   │   └── dashboard/
│   │       └── views.py       # View alternativa do dashboard (não utilizada)
│   └── migrations/            # Migrações do banco
│
├── frontend/                   # Aplicação React
│   ├── src/
│   │   ├── App.js             # Componente principal e rotas
│   │   ├── api.js             # Configuração Axios (não utilizado)
│   │   ├── services/
│   │   │   └── api.js         # Cliente API (não utilizado)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx      # Layout principal
│   │   │   │   ├── Header.jsx      # Cabeçalho
│   │   │   │   └── Sidebar.jsx     # Menu lateral
│   │   │   ├── ui/            # Componentes reutilizáveis
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Label.jsx
│   │   │   └── PrivateRoute.js     # Rota protegida
│   │   └── pages/
│   │       ├── Login.js            # Página de login
│   │       ├── Dashboard.jsx      # Dashboard principal
│   │       ├── Members.jsx        # Menu de membros
│   │       ├── Financial.jsx      # Placeholder financeiro
│   │       ├── Certificates.jsx   # Placeholder certificados
│   │       ├── VirtualRoom.jsx    # Placeholder sala virtual
│   │       └── membros/
│   │           ├── CadastroMembro.jsx    # ⚠️ Usa localStorage
│   │           ├── ListagemMembros.jsx   # ⚠️ Usa localStorage
│   │           └── EditarMembro.jsx      # ✅ Integrado com API
│   │
│   ├── package.json
│   └── tailwind.config.js
│
├── db.sqlite3                  # Banco de dados SQLite
├── manage.py                   # Script de gerenciamento Django
├── requirements.txt            # Dependências Python
└── README.md                   # Este arquivo
```

---

## 📊 Estado Atual do Projeto

### ✅ **O QUE ESTÁ FUNCIONANDO**

#### Backend (Django)
1. **Autenticação JWT**
   - Login com `username` e `password`
   - Geração de tokens `access` e `refresh`
   - Refresh automático de tokens
   - Endpoint: `/api/token/` e `/api/token/refresh/`

2. **Modelos de Dados**
   - `Usuario`: Modelo customizado estendendo `AbstractUser`
     - Campos: `genero`, `idade`
   - `Membro`: Modelo completo para cadastro de membros
     - Campos: `nome_completo`, `cpf`, `rg`, `data_nascimento`, `endereco`, `telefone`, `email`, `batizado`, `data_batismo`, `ministerio`, `ativo`, `genero`, `idade`, `usuario_responsavel`

3. **API REST - CRUD de Membros**
   - ✅ **GET** `/api/membros/` - Listar todos os membros
   - ✅ **GET** `/api/membros/{id}/` - Detalhes de um membro
   - ✅ **POST** `/api/membros/` - Criar novo membro
   - ✅ **PUT** `/api/membros/{id}/` - Atualizar membro
   - ✅ **DELETE** `/api/membros/{id}/` - Excluir membro
   - Protegido com autenticação JWT

4. **Dashboard API**
   - Endpoint: `/api/dashboard/`
   - Retorna métricas: total de usuários, ativos/inativos, distribuição por gênero, faixas etárias
   - Protegido com autenticação JWT

5. **CORS Configurado**
   - Permite requisições de `http://localhost:3000`
   - `CORS_ALLOW_ALL_ORIGINS = True` (desenvolvimento)

#### Frontend (React)
1. **Autenticação**
   - Página de login funcional
   - Armazenamento de tokens no `localStorage`
   - Refresh automático de tokens a cada 4 minutos
   - Redirecionamento automático para `/login` quando não autenticado

2. **Layout e Navegação**
   - Layout responsivo com Header, Sidebar e conteúdo principal
   - Menu lateral com navegação entre módulos
   - Indicadores visuais de módulos completos/em desenvolvimento
   - Roteamento com React Router DOM

3. **Dashboard**
   - Página funcional conectada à API
   - Exibe métricas básicas (hardcoded atualmente)
   - Cards de estatísticas e ações rápidas

4. **Módulo de Membros - Parcialmente Funcional**
   - ✅ **EditarMembro.jsx**: Totalmente integrado com API backend
   - ⚠️ **CadastroMembro.jsx**: Usa `localStorage` (NÃO integrado com API)
   - ⚠️ **ListagemMembros.jsx**: Usa `localStorage` (NÃO integrado com API)
   - ⚠️ **MembrosPage.jsx**: Integrado com API, mas não está sendo usado nas rotas

5. **Componentes UI**
   - Button, Card, Input, Label implementados
   - Design consistente com TailwindCSS

---

### ⚠️ **PROBLEMAS E INCONSISTÊNCIAS IDENTIFICADAS**

1. **Cadastro de Membros Desconectado**
   - `CadastroMembro.jsx` salva dados em `localStorage` ao invés de usar a API
   - `ListagemMembros.jsx` lê de `localStorage` ao invés da API
   - **Impacto**: Dados não são persistidos no banco de dados

2. **Duplicação de Arquivos**
   - `frontend/src/api.js` e `frontend/src/services/api.js` (ambos não utilizados)
   - `frontend/src/Login.js` e `frontend/src/pages/Login.js` (duplicado)
   - `frontend/src/pages/MembrosPage.jsx` existe mas não está nas rotas

3. **Configuração JWT Duplicada**
   - `backend/settings_jwt.py` existe mas não é importado em `settings.py`
   - Configurações JWT estão diretamente em `settings.py`

4. **Dashboard com Dados Hardcoded**
   - Cards de estatísticas no Dashboard mostram valores fixos
   - API do dashboard retorna dados reais, mas não são utilizados na interface

5. **Páginas Placeholder**
   - `Financial.jsx`, `Certificates.jsx`, `VirtualRoom.jsx` são apenas placeholders

6. **Inconsistência de Cliente HTTP**
   - Alguns componentes usam `axios` diretamente
   - Outros usam `fetch` nativo
   - `services/api.js` existe mas não é utilizado

---

### 🔜 **FUNCIONALIDADES PENDENTES**

#### Módulos Não Implementados
1. **Módulo Financeiro**
   - Modelos: Receitas, Despesas, Dízimos, Categorias
   - CRUD completo
   - Relatórios e gráficos

2. **Módulo de Certificados**
   - Modelos: Certificado, Template
   - Geração de PDFs
   - Histórico de emissões

3. **Módulo de Sala Virtual**
   - Integração com streaming
   - Biblioteca de vídeos
   - Agendamento de eventos

#### Melhorias Necessárias
1. **Integração Frontend/Backend**
   - Conectar `CadastroMembro.jsx` com API
   - Conectar `ListagemMembros.jsx` com API
   - Usar dados reais do dashboard na interface

2. **Validações**
   - Validação de CPF no frontend e backend
   - Validação de email
   - Validação de telefone

3. **Tratamento de Erros**
   - Mensagens de erro amigáveis
   - Feedback visual para ações do usuário
   - Loading states consistentes

4. **Testes**
   - Testes unitários (Django)
   - Testes de integração
   - Testes E2E (opcional)

5. **Deploy**
   - Configuração para PostgreSQL
   - Deploy no Railway (backend)
   - Deploy no Vercel (frontend)
   - Variáveis de ambiente

---

## 🚀 Instalação e Configuração

### Pré-requisitos
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend

1. **Criar ambiente virtual**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# ou
source venv/bin/activate  # Linux/Mac
```

2. **Instalar dependências**
```bash
pip install -r requirements.txt
```

3. **Executar migrações**
```bash
python manage.py migrate
```

4. **Criar superusuário (opcional)**
```bash
python manage.py createsuperuser
```

5. **Iniciar servidor**
```bash
python manage.py runserver
```
Backend estará disponível em `http://localhost:8000`

### Frontend

1. **Instalar dependências**
```bash
cd frontend
npm install
```

2. **Iniciar servidor de desenvolvimento**
```bash
npm start
```
Frontend estará disponível em `http://localhost:3000`

---

## 🔌 API Endpoints

### Autenticação
- `POST /api/token/` - Obter tokens (access e refresh)
  - Body: `{ "username": "user", "password": "pass" }`
- `POST /api/token/refresh/` - Renovar access token
  - Body: `{ "refresh": "token" }`

### Usuário
- `GET /api/me/` - Dados do usuário autenticado
  - Headers: `Authorization: Bearer {token}`

### Membros
- `GET /api/membros/` - Listar todos os membros
- `GET /api/membros/{id}/` - Detalhes de um membro
- `POST /api/membros/` - Criar novo membro
- `PUT /api/membros/{id}/` - Atualizar membro
- `DELETE /api/membros/{id}/` - Excluir membro

### Dashboard
- `GET /api/dashboard/` - Métricas e estatísticas

### Teste
- `GET /api/test/` - Endpoint de teste (sem autenticação)

---

## 📍 Onde Você Parou

### ✅ **Concluído**
1. Estrutura básica do projeto (Django + React)
2. Autenticação JWT funcionando
3. Modelos de dados (Usuario e Membro)
4. API REST completa para membros
5. Dashboard API com métricas
6. Layout e navegação do frontend
7. Página de login funcional
8. Edição de membros integrada com backend

### 🔄 **Em Progresso / Incompleto**
1. **Cadastro de Membros**: Formulário existe mas salva em `localStorage` ao invés da API
2. **Listagem de Membros**: Lê de `localStorage` ao invés da API
3. **Dashboard**: Interface existe mas usa dados hardcoded, não os dados reais da API

### ⏳ **Próximas Prioridades**
1. **Corrigir integração de membros** (alta prioridade)
   - Conectar `CadastroMembro.jsx` com `POST /api/membros/`
   - Conectar `ListagemMembros.jsx` com `GET /api/membros/`
   - Remover uso de `localStorage` para membros

2. **Melhorar Dashboard** (média prioridade)
   - Usar dados reais da API `/api/dashboard/`
   - Implementar gráficos com Chart.js
   - Adicionar loading states

3. **Limpeza de código** (média prioridade)
   - Remover arquivos duplicados
   - Padronizar uso de `axios` ou `fetch`
   - Centralizar configuração de API

4. **Implementar módulos pendentes** (baixa prioridade)
   - Módulo Financeiro
   - Módulo de Certificados
   - Módulo de Sala Virtual

---

## 🎯 Próximos Passos Recomendados

### Fase 1: Correções Críticas (1-2 dias)
1. ✅ Integrar `CadastroMembro.jsx` com API
2. ✅ Integrar `ListagemMembros.jsx` com API
3. ✅ Remover código de `localStorage` relacionado a membros
4. ✅ Testar fluxo completo: cadastrar → listar → editar → excluir

### Fase 2: Melhorias de UX (2-3 dias)
1. ✅ Implementar dados reais no Dashboard
2. ✅ Adicionar gráficos com Chart.js
3. ✅ Melhorar tratamento de erros
4. ✅ Adicionar feedback visual (toasts, loading)

### Fase 3: Validações e Segurança (1-2 dias)
1. ✅ Validação de CPF
2. ✅ Validação de email e telefone
3. ✅ Sanitização de inputs
4. ✅ Rate limiting (opcional)

### Fase 4: Novos Módulos (1-2 semanas)
1. ✅ Módulo Financeiro completo
2. ✅ Módulo de Certificados
3. ✅ Módulo de Sala Virtual

### Fase 5: Deploy (3-5 dias)
1. ✅ Configurar PostgreSQL
2. ✅ Variáveis de ambiente
3. ✅ Deploy backend (Railway)
4. ✅ Deploy frontend (Vercel)
5. ✅ Configurar domínio e SSL

---

## 🏗️ Arquitetura

### Backend (Django)
- **Padrão**: REST API com Django REST Framework
- **Autenticação**: JWT (SimpleJWT)
- **Banco de Dados**: SQLite (dev) → PostgreSQL (prod)
- **Estrutura**: App único (`usuarios`) contendo usuários e membros

### Frontend (React)
- **Padrão**: SPA (Single Page Application)
- **Roteamento**: React Router DOM
- **Estado**: Local (useState) + localStorage para tokens
- **Estilização**: TailwindCSS
- **HTTP Client**: Axios (parcialmente) + Fetch nativo

### Comunicação
- **Protocolo**: HTTP/HTTPS
- **Formato**: JSON
- **Autenticação**: Bearer Token (JWT)
- **CORS**: Habilitado para desenvolvimento

---

## 📝 Notas Técnicas

### Configurações Importantes
- **SECRET_KEY**: Atualmente hardcoded (`'django-insecure-fake-key'`)
  - ⚠️ **Atenção**: Deve ser alterado para produção usando variáveis de ambiente
- **DEBUG**: `True` (desenvolvimento)
- **CORS_ALLOW_ALL_ORIGINS**: `True` (apenas desenvolvimento)

### Migrações
- Todas as migrações estão aplicadas
- Modelos: `Usuario` (0001, 0002), `Membro` (0003)

### Dependências Python
```
Django>=4.2
djangorestframework
djangorestframework-simplejwt
django-cors-headers
psycopg2-binary
```

### Dependências Node
- Ver `frontend/package.json` para lista completa

---

## 🐛 Problemas Conhecidos

1. **Cadastro de membros não persiste no banco**
   - **Causa**: `CadastroMembro.jsx` usa `localStorage`
   - **Solução**: Integrar com `POST /api/membros/`

2. **Listagem não mostra membros do banco**
   - **Causa**: `ListagemMembros.jsx` lê de `localStorage`
   - **Solução**: Integrar com `GET /api/membros/`

3. **Dashboard mostra dados fictícios**
   - **Causa**: Valores hardcoded na interface
   - **Solução**: Consumir dados de `/api/dashboard/`

4. **Arquivos duplicados**
   - **Causa**: Desenvolvimento iterativo sem limpeza
   - **Solução**: Remover arquivos não utilizados

---

## 📞 Suporte e Contribuição

Este é um projeto em desenvolvimento ativo. Para contribuir:

1. Identifique uma issue ou melhoria
2. Crie uma branch para sua feature
3. Implemente e teste
4. Envie um pull request

---

## 📅 Última Atualização

**Data**: Janeiro 2025  
**Versão**: 0.1.0 (Desenvolvimento)  
**Status**: ~50% completo

---

## 📄 Licença

Projeto desenvolvido como iniciativa educacional para gestão eclesiástica.

---

**Desenvolvido com ❤️ para gestão de igrejas**
