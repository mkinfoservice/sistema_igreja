# 📍 ROADMAP - Sistema Igreja

Este roadmap detalha as tarefas necessárias para o desenvolvimento completo do sistema de gestão de igreja 100% em nuvem. O projeto é dividido em módulos e etapas com prioridade, status, estimativa de tempo e responsáveis.

## 📊 Visão Geral do Progresso
- **Início do Projeto**: 01/05/2025
- **Progresso Atual**: 25% concluído
- **Próxima Milestone**: MVP com Login e Cadastro de Membros (Previsão: 15/06/2025)
- **Lançamento v1.0**: Previsão para 01/09/2025

---

## 🧱 Estrutura Inicial

| Tarefa                                   | Prioridade | Status     | Estimativa | Responsável | Dependências |
|------------------------------------------|------------|------------|------------|-------------|--------------|
| Criar repositório Git e README.md        | Alta       | ✅ Concluído | 1 dia      | Maykon      | Nenhuma      |
| Criar backend Django com DRF             | Alta       | ✅ Concluído | 3 dias     | Maykon      | Repositório  |
| Configurar autenticação personalizada    | Alta       | ✅ Concluído | 2 dias     | Maykon      | Backend      |
| Criar frontend React com Tailwind 3.4.7  | Alta       | ✅ Concluído | 3 dias     | Maykon      | Repositório  |
| Integrar frontend e backend              | Alta       | ✅ Concluído | 2 dias     | Maykon      | Backend, Frontend |
| Configurar CORS e rota de teste api/test/ | Alta      | ✅ Concluído | 1 dia      | Maykon      | Backend, Frontend |

**Milestone 1**: ✅ Estrutura Base Concluída (10/05/2025)

---

## 🔐 Autenticação & Usuários

| Tarefa                                        | Prioridade | Status     | Estimativa | Responsável | Dependências |
|-----------------------------------------------|------------|------------|------------|-------------|--------------|
| Cadastro de usuários                          | Alta       | ✅ Concluído | 2 dias     | Maykon      | Autenticação personalizada |
| Login com JWT ou Token                        | Alta       | 🟡 Em andamento | 3 dias  | Maykon      | Cadastro de usuários |
| Proteção de rotas no frontend                 | Alta       | 🔲 Pendente | 2 dias     | Maykon      | Login com JWT |
| Painel de usuário (página protegida)          | Alta       | 🔲 Pendente | 3 dias     | Maykon      | Proteção de rotas |
| Testes de integração do sistema de autenticação | Média    | 🔲 Pendente | 2 dias     | Maykon      | Login completo |

**Milestone 2**: 🟡 Sistema de Login (Previsão: 25/05/2025)

---

## 👥 Módulo: Membros

| Tarefa                                      | Prioridade | Status     | Estimativa | Responsável | Dependências |
|---------------------------------------------|------------|------------|------------|-------------|--------------|
| CRUD de membros                             | Alta       | 🔲 Pendente | 5 dias     | Maykon      | Sistema de Login |
| Filtro por cargos, idade, cidade etc.       | Média      | 🔲 Pendente | 3 dias     | Maykon      | CRUD de membros |
| Upload de foto e documentos                 | Média      | 🔲 Pendente | 4 dias     | Maykon      | CRUD de membros |
| Testes unitários para o módulo de membros   | Média      | 🔲 Pendente | 2 dias     | Maykon      | CRUD completo |

**Milestone 3**: 🔲 Cadastro de Membros Completo (Previsão: 15/06/2025)

---

## 🧾 Módulo: Certificados

| Tarefa                                          | Prioridade | Status     |
|-------------------------------------------------|------------|------------|
| Geração automática de certificados em PDF       | Alta       | 🔲 Pendente |
| Download e envio por e-mail                     | Média      | 🔲 Pendente |
| Histórico de certificados emitidos              | Média      | 🔲 Pendente |

---

## 💸 Módulo: Finanças

| Tarefa                              | Prioridade | Status     |
|-------------------------------------|------------|------------|
| Controle de entradas e saídas       | Alta       | 🔲 Pendente |
| Relatórios mensais                  | Alta       | 🔲 Pendente |
| Exportação para Excel               | Média      | 🔲 Pendente |
| Gráficos com Chart.js               | Média      | 🔲 Pendente |

---

## 🎥 Módulo: Sala Virtual

| Tarefa                                         | Prioridade | Status     |
|------------------------------------------------|------------|------------|
| Integração com YouTube Live / RTMP             | Média      | 🔲 Pendente |
| Chat ao vivo                                   | Baixa      | 🔲 Pendente |
| Agenda de transmissões                         | Média      | 🔲 Pendente |

---

## 🌐 Infraestrutura & Deploy

| Tarefa                                          | Prioridade | Status     |
|-------------------------------------------------|------------|------------|
| Deploy backend na Railway                       | Alta       | 🔲 Pendente |
| Deploy frontend na Vercel                       | Alta       | 🔲 Pendente |
| Configurar variáveis de ambiente (.env)         | Alta       | 🔲 Pendente |
| Configurar domínio e HTTPS                      | Média      | 🔲 Pendente |

---

## 📱 UI/UX & Responsividade

| Tarefa                                    | Prioridade | Status     |
|-------------------------------------------|------------|------------|
| Design responsivo com Tailwind            | Alta       | 🟡 Em andamento |
| Tema escuro opcional                      | Média      | 🔲 Pendente |
| PWA (opcional)                            | Baixa      | 🔲 Pendente |

---

## ✅ Progresso Geral e Milestones

| Etapa                     | Status     | Data Prevista | % Concluído |
|---------------------------|------------|---------------|-------------|
| Planejamento              | ✅ Concluído | 05/05/2025    | 100%        |
| Backend Inicial           | ✅ Concluído | 10/05/2025    | 100%        |
| Frontend Base             | ✅ Concluído | 10/05/2025    | 100%        |
| Integração Inicial        | ✅ Concluído | 12/05/2025    | 100%        |
| Sistema de Autenticação   | 🟡 Em andamento | 25/05/2025 | 60%         |
| Módulo de Membros         | 🔲 Pendente | 15/06/2025    | 0%          |
| Módulo de Certificados    | 🔲 Pendente | 01/07/2025    | 0%          |
| Módulo de Finanças        | 🔲 Pendente | 15/07/2025    | 0%          |
| Módulo de Sala Virtual    | 🔲 Pendente | 01/08/2025    | 0%          |
| Testes e Refinamentos     | 🔲 Pendente | 15/08/2025    | 0%          |
| Deploy Produção           | 🔲 Pendente | 01/09/2025    | 0%          |

---

## 🧠 Considerações Finais

Este roadmap pode ser atualizado conforme o projeto evolui. Marque tarefas conforme forem sendo concluídas e use-o como guia para organizar a equipe, prazos e prioridades.

---