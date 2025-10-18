# 🛠️ ROADMAP — Sistema Igreja Full

Este documento apresenta a trajetória e o estado atual do projeto **Sistema Igreja Full**, uma plataforma completa de gestão e administração de igrejas em nuvem, desenvolvida com **Django (backend)** e **React (frontend)**.

---

## 📅 Fases de Desenvolvimento

### 🏗️ Fase 1 — Estrutura Básica ✅ *Concluída*
- Configuração inicial do projeto Django e React
- Integração entre backend e frontend
- Criação do modelo de usuário personalizado (Usuario)
- Configuração de autenticação JWT com SimpleJWT
- Implementação de CORS e conexão segura entre sistemas
- Rota de teste da API e estrutura REST
- Correção do modelo de usuário e campos personalizados
- View `dashboard_view` com métricas
- Rota `/api/dashboard/` implementada
- Script de geração de usuários fake para testes

🟢 **Progresso:** 100%

---

### ⚙️ Fase 2 — Módulos Principais 🚧 *Em Desenvolvimento*
#### ✅ **Módulo de Membros**
- CRUD completo implementado:
  - Cadastro de membros
  - Listagem de membros com busca e filtros
  - Edição e exclusão de membros
  - Comunicação via API protegida com JWT
- Integração total entre Django e React
- Interface funcional conectada e validada com backend

#### ✅ **Dashboard**
- Métricas básicas (gênero, idade, total de membros)
- Endpoint e visual conectados no frontend

#### 🔄 **Interface e Painel**
- Layout base implementado (`Layout.jsx`)
- Header, menu lateral, footer e navegação com React Router
- Responsividade parcial e design inicial do painel

🟡 **Progresso estimado:** 70%

---

### 🎨 Fase 3 — Interface e UX 🔄 *Em Andamento*
- Criação da página principal **Gestão Igreja Full**
- Estrutura de navegação global com React Router DOM
- Layout limpo e responsivo
- Padronização visual com TailwindCSS
- Integração de componentes reutilizáveis (Cards, Inputs, Botões)

🟡 **Progresso estimado:** 40%

---

### 🧪 Fase 4 — Estabilização e Deploy ⏳ *Não Iniciada*
- Testes automatizados (Django + React)
- Logs e sistema de monitoramento
- Migração para **PostgreSQL** em produção
- Deploy no **Railway (backend)** e **Vercel (frontend)**
- Configuração de domínio e SSL

⚪ **Progresso:** 0%

---

### 🚀 Fase 5 — Expansão e Recursos Avançados 🔜 *Planejada*
- **Módulo de Certificados** (emissão e templates personalizados)
- **Módulo Financeiro** (receitas, despesas, dízimos)
- **Módulo de Sala Virtual** (transmissões ao vivo e biblioteca)
- Relatórios e gráficos avançados
- Sistema de backup automático
- Notificações (email/push)
- Aplicativo móvel (React Native)

⚪ **Progresso:** 0%

---

## 📊 Situação Atual — Junho/2025

| Módulo / Área | Status | Descrição |
|----------------|---------|------------|
| **Autenticação** | ✅ Concluído | JWT e autenticação funcionando com login/logout |
| **Dashboard** | ✅ Concluído | Métricas integradas e conectadas ao frontend |
| **Membros** | ✅ Concluído | CRUD completo (cadastro, edição, listagem, exclusão) |
| **UI / Layout** | 🔄 Em andamento | Layout global e navegação entre módulos |
| **Infraestrutura Local** | ✅ Concluído | Sistema rodando perfeitamente em ambiente local |
| **Deploy Produção** | ⏳ Pendente | Railway + Vercel ainda não configurados |
| **Certificados** | ⏳ Pendente | Não iniciado |
| **Financeiro** | ⏳ Pendente | Não iniciado |
| **Sala Virtual** | ⏳ Pendente | Não iniciado |
| **Relatórios/Gráficos** | 🔄 Parcial | Integração futura com dashboard |
| **Testes Automatizados** | ⏳ Pendente | Não iniciado |
| **Backup e Logs** | ⏳ Pendente | Planejado para fase final |

---

## 📈 Progresso Geral

| Fase | Percentual | Situação |
|-------|-------------|-----------|
| Fase 1 | 100% | ✅ Concluída |
| Fase 2 | 70% | 🚧 Em desenvolvimento |
| Fase 3 | 40% | 🔄 Em andamento |
| Fase 4 | 0% | ⏳ Pendente |
| Fase 5 | 0% | 🔜 Planejada |

📊 **Progresso total estimado:** **≈ 50% concluído**

---

## 🔮 Próximos Passos Imediatos

1. Concluir layout global e navegação entre páginas
2. Melhorar responsividade e design mobile-first
3. Implementar módulo de **Certificados**
4. Criar módulo **Financeiro**
5. Configurar **PostgreSQL** e ambiente de produção
6. Preparar documentação e README final para release

---

✍️ **Última atualização:** 18 de Outubro de 2025
