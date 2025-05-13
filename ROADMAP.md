# 🗺️ ROADMAP - Sistema Igreja

Este documento detalha o plano de desenvolvimento do Sistema Igreja, uma plataforma de gestão para igrejas 100% em nuvem.

## 📅 Cronograma de Desenvolvimento

### Fase 1: Fundação e Estrutura Básica ✅
- [x] Configuração inicial do projeto Django
- [x] Configuração do React com TailwindCSS
- [x] Integração entre backend e frontend
- [x] Implementação do modelo de usuário personalizado (`Usuario`)
- [x] Configuração de autenticação básica
- [x] Implementação da rota de teste da API
- [x] Correção do modelo de usuário personalizado (campos e referências)
- [x] Adição dos campos 'genero' e 'idade' ao modelo Usuario
- [x] Implementação da view `dashboard_view` com métricas de usuários
- [x] Criação da rota `/api/dashboard/`
- [x] Desenvolvimento de script para geração de usuários fake para testes

### Fase 2: Desenvolvimento dos Módulos Principais 🚧
- [ ] **Módulo de Cadastro de Membros** (Em Andamento)
  - [x] Modelo base de usuários/membros
  - [x] API para listagem e métricas básicas de usuários
  - [ ] Funcionalidades de busca e filtro avançados
  - [ ] Importação e exportação de dados (CSV/Excel)
  - [ ] Categorização de membros (Visitante, Membro, Líder, etc.)
  - [ ] Histórico de atividades por membro

- [ ] **Módulo de Dashboard e Relatórios** (Em Andamento)
  - [x] Dashboard com métricas básicas de usuários
  - [x] Visualização de distribuição por gênero
  - [x] Visualização de distribuição por faixa etária
  - [ ] Relatórios de crescimento (semanal, mensal, anual)
  - [ ] Exportação de relatórios em PDF
  - [ ] Dashboard financeiro

- [ ] **Módulo Financeiro**
  - [ ] Cadastro de receitas e despesas
  - [ ] Categorias financeiras personalizáveis
  - [ ] Gestão de dízimos e ofertas
  - [ ] Relatórios financeiros
  - [ ] Controle de contas a pagar e receber
  - [ ] Integração com sistemas de pagamento online (opcional)

- [ ] **Módulo de Certificados**
  - [ ] Templates de certificados personalizáveis
  - [ ] Geração automática de certificados (batismo, casamento, cursos)
  - [ ] Emissão em PDF com assinatura digital
  - [ ] Registro histórico de certificados emitidos

- [ ] **Módulo de Sala Virtual**
  - [ ] Integração com serviço de streaming
  - [ ] Agendamento de transmissões
  - [ ] Chat durante transmissões
  - [ ] Biblioteca de transmissões anteriores

### Fase 3: Aprimoramento da Interface 🔮
- [ ] Desenvolvimento da interface completa do frontend
- [ ] Design mobile-first e responsivo
- [ ] Implementação de temas personalizáveis
- [ ] Melhorias de acessibilidade
- [ ] Otimização para dispositivos móveis

### Fase 4: Estabilização e Implantação 🔮
- [ ] Testes unitários e de integração
- [ ] Correção de bugs e otimizações
- [ ] Migração para PostgreSQL
- [ ] Deploy para ambiente de produção (Railway/Vercel)
- [ ] Documentação completa para usuários

### Fase 5: Expansão e Recursos Avançados 🔮
- [ ] Sistema de backup automático
- [ ] Sistema de notificações (email/push)
- [ ] Aplicativo móvel (React Native) 
- [ ] Integração com serviços de email marketing
- [ ] Módulo de eventos e inscrições
- [ ] Módulo de gestão de células/grupos pequenos

## 📊 Métricas de Progresso
- **Fase 1:** 100% concluída
- **Fase 2:** 15% concluída
- **Fase 3:** 5% concluída
- **Fase 4:** 0% concluída
- **Fase 5:** 0% concluída
- **Progresso Total:** Aproximadamente 25% concluído

## 🔄 Iterações Recentes

### Última Iteração (13/05/2025)
- Corrigida referência ao modelo de usuário personalizado (Usuario)
- Corrigido erro de campo inexistente 'genero' para métricas no dashboard
- Corrigidas chamadas incorretas de métodos `.count()` e `.filter()`
- Implementada view 'dashboard_view' com métricas de usuários
- Adicionada rota `/api/dashboard/` em urls.py
- Ajustado serializer e estrutura de models com campos 'genero' e 'idade'
- Criado script para geração de usuários fake com dados completos

### Próxima Iteração (Planejada)
- Melhorar visualizações do dashboard no frontend
- Conectar frontend com endpoint de dashboard
- Iniciar desenvolvimento do módulo financeiro
- Expandir funcionalidades do cadastro de membros

## 🚀 Prioridades Atuais
1. **ALTA:** Completar integração do dashboard entre frontend e backend
2. **ALTA:** Finalizar módulo de cadastro de membros com todas funcionalidades
3. **MÉDIA:** Iniciar desenvolvimento do módulo financeiro
4. **MÉDIA:** Melhorar UX/UI do frontend
5. **BAIXA:** Preparar ambiente de produção para primeiro deploy

## 🛠️ Pontos Técnicos a Resolver
- Otimizar queries do dashboard para melhor performance
- Implementar cache para dados frequentemente acessados
- Padronizar formato de resposta da API
- Implementar sistema de logs mais robusto
- Configurar sistema de backup automatizado

---

*Este roadmap é um documento vivo e será atualizado conforme o desenvolvimento avança.*

Última atualização: 13/05/2025