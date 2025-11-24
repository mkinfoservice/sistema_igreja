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
│   │   ├── utils/                 # Utilitários
│   │   │   ├── validators.js      # Validações e máscaras (CPF, telefone, email)
│   │   │   └── export.js         # Exportação CSV
│   │   └── pages/
│   │       ├── Login.js            # Página de login
│   │       ├── Dashboard.jsx      # Dashboard principal
│   │       ├── Members.jsx        # Menu de membros
│   │       ├── Financial.jsx      # Placeholder financeiro
│   │       ├── Certificates.jsx   # Placeholder certificados
│   │       ├── VirtualRoom.jsx    # Placeholder sala virtual
│   │       └── membros/
│   │           ├── CadastroMembro.jsx    # ✅ Integrado com API + Validações + Máscaras
│   │           ├── ListagemMembros.jsx  # ✅ Integrado com API + Busca + Filtros + Paginação + Exportação
│   │           └── EditarMembro.jsx     # ✅ Integrado com API
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

4. **Módulo de Membros - ✅ TOTALMENTE FUNCIONAL**
   - ✅ **CadastroMembro.jsx**: 
     - Integrado com API backend (POST /api/membros/)
     - Validação de CPF com dígitos verificadores
     - Máscaras automáticas (CPF, telefone)
     - Validação de email e telefone
     - Feedback visual de erros
   - ✅ **ListagemMembros.jsx**: 
     - Integrado com API backend (GET /api/membros/)
     - Busca em tempo real (nome, email, CPF, telefone)
     - Filtros avançados (Status, Gênero, Ministério)
     - Paginação (10 itens por página)
     - Exportação para CSV
     - Exclusão via API (DELETE /api/membros/{id}/)
     - Navegação para edição
   - ✅ **EditarMembro.jsx**: Totalmente integrado com API backend

5. **Utilitários**
   - ✅ **validators.js**: Validação de CPF, telefone, email + máscaras
   - ✅ **export.js**: Exportação de dados para CSV

6. **Componentes UI**
   - Button, Card, Input, Label implementados
   - Design consistente com TailwindCSS
   - Ícones com lucide-react

---

### ⚠️ **PROBLEMAS E INCONSISTÊNCIAS IDENTIFICADAS**

1. **Duplicação de Arquivos**
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
1. **Dashboard com Dados Reais**
   - Usar dados reais da API `/api/dashboard/` na interface
   - Implementar gráficos com Chart.js usando dados reais

2. **Validações no Backend**
   - Validação de CPF no backend (Django)
   - Validação de email no backend
   - Validação de telefone no backend

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

## 🆕 Funcionalidades Recentes Implementadas

### Módulo de Membros - Versão Completa

#### ✅ Cadastro de Membros (`CadastroMembro.jsx`)
- **Integração completa com API**: Dados são salvos no banco de dados via `POST /api/membros/`
- **Validação de CPF**: Verifica dígitos verificadores em tempo real
- **Máscaras automáticas**: 
  - CPF: `000.000.000-00`
  - Telefone: `(00) 00000-0000`
- **Validações em tempo real**:
  - CPF válido (11 dígitos + verificação de dígitos)
  - Email válido (formato correto)
  - Telefone válido (10 ou 11 dígitos)
- **Feedback visual**: Campos ficam vermelhos quando inválidos
- **Tratamento de erros**: Mensagens claras e específicas

#### ✅ Listagem de Membros (`ListagemMembros.jsx`)
- **Integração completa com API**: Busca membros via `GET /api/membros/`
- **Busca em tempo real**: 
  - Busca por nome, email, CPF ou telefone
  - Filtragem instantânea enquanto digita
- **Filtros avançados**:
  - Status: Todos / Ativos / Inativos
  - Gênero: Todos / Masculino / Feminino / Outro / Prefere não informar
  - Ministério: Lista dinâmica baseada nos membros cadastrados
- **Paginação**:
  - 10 membros por página
  - Navegação entre páginas
  - Indicador de página atual
- **Exportação CSV**:
  - Exporta membros filtrados
  - Formatação adequada (datas, booleanos)
  - Compatível com Excel
- **Exclusão integrada**: Via `DELETE /api/membros/{id}/`
- **Navegação para edição**: Botão que leva para `/membros/editar/{id}`

#### ✅ Utilitários Criados

**`utils/validators.js`**:
- `validarCPF()`: Valida CPF com cálculo de dígitos verificadores
- `formatarCPF()`: Aplica máscara de CPF
- `limparCPF()`: Remove formatação do CPF
- `validarTelefone()`: Valida formato de telefone brasileiro
- `formatarTelefone()`: Aplica máscara de telefone
- `validarEmail()`: Valida formato de email
- `formatarData()`: Formata data para exibição

**`utils/export.js`**:
- `exportarCSV()`: Exporta array de objetos para CSV
- Formatação automática de datas e booleanos
- Compatível com Excel (BOM UTF-8)
- Mapeamento de campos para nomes amigáveis

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
8. **Módulo de Membros COMPLETO**:
   - ✅ Cadastro integrado com API + Validações + Máscaras
   - ✅ Listagem integrada com API + Busca + Filtros + Paginação + Exportação CSV
   - ✅ Edição integrada com backend
   - ✅ Exclusão integrada com backend
9. **Utilitários**:
   - ✅ Validação de CPF com dígitos verificadores
   - ✅ Máscaras automáticas (CPF, telefone)
   - ✅ Validação de email e telefone
   - ✅ Exportação para CSV

### 🔄 **Em Progresso / Incompleto**
1. **Dashboard**: Interface existe mas usa dados hardcoded, não os dados reais da API

### ⏳ **Próximas Prioridades**
1. **Melhorar Dashboard** (alta prioridade)
   - Usar dados reais da API `/api/dashboard/`
   - Implementar gráficos com Chart.js usando dados reais
   - Adicionar loading states e tratamento de erros

2. **Validações no Backend** (média prioridade)
   - Validação de CPF no backend (Django)
   - Validação de email no backend
   - Validação de telefone no backend
   - Mensagens de erro mais descritivas

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

### Fase 1: Correções Críticas ✅ **CONCLUÍDA**
1. ✅ Integrar `CadastroMembro.jsx` com API
2. ✅ Integrar `ListagemMembros.jsx` com API
3. ✅ Remover código de `localStorage` relacionado a membros
4. ✅ Testar fluxo completo: cadastrar → listar → editar → excluir

### Fase 2: Melhorias de UX ✅ **PARCIALMENTE CONCLUÍDA**
1. ✅ Adicionar validações e máscaras no cadastro
2. ✅ Implementar busca e filtros na listagem
3. ✅ Adicionar paginação na listagem
4. ✅ Implementar exportação CSV
5. ✅ Melhorar tratamento de erros
6. ✅ Adicionar feedback visual (loading, mensagens)
7. ⏳ **PENDENTE**: Implementar dados reais no Dashboard
8. ⏳ **PENDENTE**: Adicionar gráficos com Chart.js usando dados reais

### Fase 3: Validações e Segurança ✅ **PARCIALMENTE CONCLUÍDA**
1. ✅ Validação de CPF no frontend (com dígitos verificadores)
2. ✅ Validação de email no frontend
3. ✅ Validação de telefone no frontend
4. ✅ Máscaras automáticas (CPF, telefone)
5. ⏳ **PENDENTE**: Validação de CPF no backend
6. ⏳ **PENDENTE**: Validação de email no backend
7. ⏳ **PENDENTE**: Validação de telefone no backend
8. ⏳ **PENDENTE**: Sanitização de inputs no backend
9. ⏳ **PENDENTE**: Rate limiting (opcional)

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

1. **Dashboard mostra dados fictícios**
   - **Causa**: Valores hardcoded na interface
   - **Solução**: Consumir dados de `/api/dashboard/` e implementar gráficos com Chart.js

2. **Arquivos duplicados**
   - **Causa**: Desenvolvimento iterativo sem limpeza
   - **Solução**: Remover arquivos não utilizados (`api.js`, `services/api.js`, `Login.js` duplicado)

3. **Validações apenas no frontend**
   - **Causa**: Validações de CPF, email e telefone só no frontend
   - **Solução**: Implementar validações também no backend (Django serializers)

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
**Versão**: 0.2.0 (Desenvolvimento)  
**Status**: ~65% completo

### Changelog v0.2.0
- ✅ Módulo de Membros totalmente funcional
- ✅ Validações e máscaras implementadas
- ✅ Busca, filtros e paginação na listagem
- ✅ Exportação CSV implementada
- ✅ Utilitários de validação e exportação criados

---

## 📄 Licença

Projeto desenvolvido como iniciativa educacional para gestão eclesiástica.

---

**Desenvolvido com ❤️ para gestão de igrejas**
