
# ROADMAP - Sistema Igreja

Este documento descreve o progresso e plano detalhado do desenvolvimento do Sistema Igreja, uma solução 100% em nuvem para gestão e administração de igrejas.

## 🧱 Fase 1: Fundação e Estrutura ✅ (Concluída)
- Configuração do projeto Django com modelo de usuário personalizado (`Usuario`)
- Setup do React + TailwindCSS
- Integração inicial entre backend (Django) e frontend (React)
- Autenticação JWT com refresh automático via tokens
- Middleware CORS e configuração de headers no Django
- Primeiras rotas públicas e protegidas no backend
- Testes iniciais de comunicação com o frontend
- Customização do Login e Logout integrados com JWT

## 👥 Módulo de Usuários e Dashboard ✅ (Concluído)
- Campos personalizados no modelo `Usuario`: `genero`, `idade`
- View de Dashboard com métricas:
  - Total de usuários
  - Usuários ativos vs inativos
  - Gráficos por faixa etária e gênero (React Chart.js)
- Rota protegida `/api/dashboard/` e visualização no frontend
- Tratamento de erros e proteção de rota com tokens

## 👨‍👩‍👧 Cadastro e Gestão de Membros ✅ (Parcialmente Concluído)
- Criação do modelo `Membro` com:
  - Nome completo, CPF, RG, nascimento, endereço, telefone, email
  - Campos booleanos: batizado, ativo
  - Gênero, idade, data de batismo, ministério
- Integração com `Usuario` (campo `usuario_responsavel`)
- Cadastro de membros via frontend com validação
- Rota `/api/membros/` protegida e funcional
- Listagem de membros com autenticação
- Edição de membro em progresso
- Preparação do CRUD completo no React

## 🔐 Autenticação JWT ✅
- Implementação do `TokenObtainPairView` com `CustomTokenObtainPairSerializer`
- Retorno do token + informações básicas do usuário
- Armazenamento de token no `localStorage`
- Middleware de refresh a cada 4 minutos no frontend

## 🌐 Frontend (React + TailwindCSS) ✅
- Estrutura moderna com Tailwind e React Router
- Componentes isolados:
  - Login.jsx
  - Dashboard.jsx
  - CadastroMembro.jsx
  - ListagemMembros.jsx
  - EditarMembro.jsx
- Navegação com rotas privadas autenticadas (`BrowserRouter`)
- Comunicação com o backend via Axios (com headers JWT)

## 🗃️ Estrutura de Pastas (Atual)
```
/sistema_igreja/
  └── usuarios/
      ├── models.py
      ├── serializers.py
      ├── views.py
      ├── urls.py

/frontend/
  ├── components/
  │   ├── CadastroMembro.jsx
  │   ├── ListagemMembros.jsx
  │   ├── EditarMembro.jsx
  └── pages/
      ├── Login.jsx
      ├── Dashboard.jsx
  └── App.jsx
```

## ✅ Etapas Concluídas
- Integração entre frontend/backend com autenticação protegida
- Dashboard com dados analíticos reais
- Cadastro de membros funcional (via frontend e backend)
- Estruturação visual da aplicação
- Primeira fase de testes locais

## 🚧 Etapas Pendentes
### Backend:
- CRUD completo de Membros (editar e deletar)
- Emissão de Certificados
- Relatórios analíticos avançados (PDFs, exportação)
- Módulo Financeiro
- Integração com transmissões ao vivo (sala virtual)
- Testes automatizados
- Migração para PostgreSQL

### Frontend:
- Páginas de visualização, edição e exclusão de membros
- Interface mobile-first mais refinada
- Consumo de certificados e dados financeiros
- Dashboard financeiro
- Upload de arquivos (opcional)
- Filtros avançados na listagem

### Infraestrutura:
- Deploy do backend na Railway
- Deploy do frontend na Vercel
- Configuração de domínio e SSL
- CI/CD (opcional)
- Backup automático

## 📊 Progresso Geral
- Fase 1: ✅ 100%
- Fase 2: 🟨 50%
- Fase 3: 🟨 25%
- Fase 4: ⬜ 0%
- Fase 5: ⬜ 0%
- **Status Total: 40-45% concluído**

## ✅ STATUS ATUAL
- Implementamos:

- Backend com autenticação JWT

- Modelo de usuário personalizado com campos extras (genero, idade)

- Cadastro, listagem e edição de membros

- Dashboard funcional com métricas (por gênero e faixa etária)

- Integração completa com frontend (React + Tailwind)

- Organização de rotas autenticadas com React Router

- Atualização dos arquivos README.md e ROADMAP.md

## 🚀 PRÓXIMOS PASSOS (em ordem sugerida)
## 🔹 1. Finalizar fluxo de edição de membros
 - Permitir edição completa com validação no frontend

 - Confirmar edição com feedback visual (mensagem ou alerta)

 - Ajustar rota de PUT/PATCH no backend se necessário

## 🔹 2. Implementar a exclusão de membros
 - Criar botão de exclusão por membro

 - Confirmar exclusão com modal ou alerta

 - Criar rota de DELETE no backend e conectar ao frontend

## 🔹 3. Melhorar experiência da listagem de membros
 - Adicionar busca por nome ou CPF

 - Paginação (caso a lista fique longa)

 - Filtros por status (ativo/inativo), gênero e idade

## 🔹 4. Iniciar módulo de certificados
 - Criar modelo Certificado no backend

 - Vincular a membros

 - Gerar certificado em PDF (ex: batismo, curso)

 - Visualizar histórico no frontend

## 🔹 5. Iniciar módulo financeiro
 - Modelos: Receita, Despesa, Categoria

 - Cadastro e listagem

 - Relatórios por mês e categorias

 - Dashboard financeiro

## 🔹 6. Melhorias na interface e usabilidade
 - Criar um menu lateral ou navbar

 - Separar páginas com navegação clara (dashboard, membros, etc.)

 - Melhorar responsividade (mobile-first)

## 🔹 7. Preparar para produção
 - Migrar banco de dados para PostgreSQL

 - Criar .env com variáveis sensíveis

 - Deploy do backend (Railway)

 - Deploy do frontend (Vercel)

 - Configurar domínio e SSL



---
**Última atualização:** 30/05/2025
