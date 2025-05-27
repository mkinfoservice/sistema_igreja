# 📍 ROADMAP - Sistema Igreja

Este documento detalha o plano de desenvolvimento do **Sistema Igreja**, uma plataforma de gestão para igrejas 100% em nuvem.

## 📅 Cronograma de Desenvolvimento

### ✅ Fase 1: Fundação e Estrutura Básica
- Configuração inicial do projeto Django
- Configuração do React com TailwindCSS
- Integração entre backend e frontend
- Implementação do modelo de usuário personalizado (`Usuario`)
- Configuração de autenticação básica
- Implementação da rota de teste da API
- Correção do modelo de usuário personalizado (campos e referências)
- Adição dos campos `genero` e `idade` ao modelo `Usuario`
- Implementação da view `dashboard_view` com métricas de usuários
- Criação da rota `/api/dashboard/`
- Desenvolvimento de script para geração de usuários fake para testes

### 🚧 Fase 2: Desenvolvimento dos Módulos Principais
#### Módulo de Cadastro de Membros (Em Andamento)
- Modelo base de usuários/membros
- API para listagem e métricas básicas de usuários
- Funcionalidades de busca e filtro avançados
- Importação e exportação de dados (CSV/Excel)
- Categorização de membros (Visitante, Membro, Líder, etc.)
- Histórico de atividades por membro

#### Módulo de Dashboard e Relatórios (Em Andamento)
- Dashboard com métricas básicas de usuários
- Visualização de distribuição por gênero
- Visualização de distribuição por faixa etária
- Relatórios de crescimento (semanal, mensal, anual)
- Exportação de relatórios em PDF
- Dashboard financeiro

#### Módulo Financeiro (Iniciado)
- Cadastro de receitas e despesas
- Categorias financeiras personalizáveis
- Gestão de dízimos e ofertas
- Relatórios financeiros
- Controle de contas a pagar e receber
- Integração com sistemas de pagamento online (opcional)

#### Módulo de Certificados
- Templates de certificados personalizáveis
- Geração automática de certificados (batismo, casamento, cursos)
- Emissão em PDF com assinatura digital
- Registro histórico de certificados emitidos

#### Módulo de Sala Virtual
- Integração com serviço de streaming
- Agendamento de transmissões
- Chat durante transmissões
- Biblioteca de transmissões anteriores

### 🔮 Fase 3: Aprimoramento da Interface
- Desenvolvimento da interface completa do frontend
- Design mobile-first e responsivo
- Implementação de temas personalizáveis
- Melhorias de acessibilidade
- Otimização para dispositivos móveis

### 🔮 Fase 4: Estabilização e Implantação
- Testes unitários e de integração
- Correção de bugs e otimizações
- Migração para PostgreSQL
- Deploy para ambiente de produção (Railway/Vercel)
- Documentação completa para usuários

### 🔮 Fase 5: Expansão e Recursos Avançados
- Sistema de backup automático
- Sistema de notificações (email/push)
- Aplicativo móvel (React Native)
- Integração com serviços de email marketing
- Módulo de eventos e inscrições
- Módulo de gestão de células/grupos pequenos

## 📊 Métricas de Progresso
- Fase 1: ✅ 100% concluída
- Fase 2: 🔄 35% concluída
- Fase 3: 🔄 10% concluída
- Fase 4: ⏳ 0% concluída
- Fase 5: ⏳ 0% concluída

**Progresso Total: Aproximadamente 35% concluído**

## 🔄 Iterações Recentes

### Última Iteração (24/05/2025)
- Finalizada integração de autenticação condicional via BrowserRouter
- Criadas rotas autenticadas para dashboard, membros e edição
- Corrigido bug de renderização condicional baseado em autenticação
- Refatorado App.jsx para separação de rotas
- Implementado componente de edição com conexão ao backend

### Iteração Anterior (19/05/2025)
- Corrigido campo `data_batismo` com formato incorreto na API
- Integração do formulário de cadastro com backend (formato de datas ajustado)
- Testes de cadastro de membros concluídos com sucesso
- Commit completo com atualizações do backend e frontend
- Gerado README e ROADMAP atualizados

### Próxima Iteração (Planejada)
- Melhorar visualizações do dashboard no frontend
- Conectar frontend com endpoint de dashboard
- Expandir funcionalidades do módulo financeiro
- Adicionar filtros e ordenações no frontend do cadastro de membros

## 🚀 Prioridades Atuais
- **ALTA:** Finalizar módulo de membros com filtros e edição completa
- **ALTA:** Melhorar interface e responsividade geral do frontend
- **MÉDIA:** Iniciar módulo financeiro
- **BAIXA:** Iniciar preparação para deploy

## 🛠️ Pontos Técnicos a Resolver
- Otimizar queries da view de dashboard
- Implementar cache para dados estáticos
- Padronizar formatos de resposta da API
- Criar middleware para autenticação JWT (planejado)
- Definir estrutura de logs e mensagens de erro