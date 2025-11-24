# 🌿 Guia Completo de Branches no Git

Este guia explica como criar e trabalhar com branches no Git para desenvolvimento de novas features.

---

## 📚 Conceitos Básicos

### O que é uma Branch?
Uma branch é uma linha de desenvolvimento independente. Permite trabalhar em novas funcionalidades sem afetar o código principal (main).

### Por que usar Branches?
- ✅ Trabalhar em features isoladas
- ✅ Colaboração sem conflitos
- ✅ Histórico organizado
- ✅ Facilita code review
- ✅ Permite rollback fácil

---

## 🚀 Comandos Essenciais

### 1. Ver Branches Existentes

```bash
# Ver branches locais
git branch

# Ver branches locais e remotas
git branch -a

# Ver branches remotas
git branch -r
```

### 2. Criar Nova Branch

```bash
# Criar e mudar para a branch (recomendado)
git checkout -b feature/nome-da-feature

# Ou usando switch (Git 2.23+)
git switch -c feature/nome-da-feature

# Criar branch sem mudar para ela
git branch feature/nome-da-feature
git checkout feature/nome-da-feature
```

### 3. Mudar Entre Branches

```bash
# Mudar para outra branch
git checkout nome-da-branch

# Ou usando switch
git switch nome-da-branch

# Mudar para main
git checkout main
```

### 4. Ver Status e Branch Atual

```bash
# Ver branch atual e status
git status

# Ver branch atual
git branch --show-current
```

### 5. Enviar Branch para GitHub

```bash
# Primeira vez (cria branch remota e conecta)
git push -u origin feature/nome-da-feature

# Próximas vezes (após -u)
git push
```

### 6. Atualizar Branch com Main

```bash
# 1. Mudar para main
git checkout main

# 2. Atualizar main
git pull origin main

# 3. Voltar para sua branch
git checkout feature/nome-da-feature

# 4. Fazer merge de main na sua branch
git merge main

# Ou usar rebase (histórico mais limpo)
git rebase main
```

### 7. Deletar Branch

```bash
# Deletar branch local
git branch -d feature/nome-da-feature

# Forçar deleção (se não foi mergeada)
git branch -D feature/nome-da-feature

# Deletar branch remota
git push origin --delete feature/nome-da-feature
```

---

## 📋 Padrões de Nomenclatura

### Convenções Recomendadas

```
feature/    → Novas funcionalidades
fix/        → Correções de bugs
hotfix/     → Correções urgentes
refactor/   → Refatoração de código
docs/       → Documentação
test/       → Testes
chore/      → Tarefas de manutenção
```

### Exemplos Práticos

```bash
feature/modulo-financeiro
feature/dashboard-graficos
feature/certificados-pdf
fix/validacao-cpf-backend
fix/correcao-login
hotfix/erro-critico-banco
refactor/estrutura-api
docs/atualizar-readme
test/testes-integracao
```

---

## 🔄 Fluxo de Trabalho Completo

### Cenário: Desenvolver Nova Feature

#### Passo 1: Preparar Ambiente
```bash
# Garantir que main está atualizada
git checkout main
git pull origin main
```

#### Passo 2: Criar Branch
```bash
# Criar e mudar para nova branch
git checkout -b feature/modulo-financeiro
```

#### Passo 3: Desenvolver
```bash
# Fazer alterações nos arquivos
# ... editar arquivos ...

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "feat: adicionar modelo Receita"

# Continuar desenvolvendo...
git add .
git commit -m "feat: adicionar API de receitas"
```

#### Passo 4: Enviar para GitHub
```bash
# Primeira vez
git push -u origin feature/modulo-financeiro

# Próximas vezes
git push
```

#### Passo 5: Criar Pull Request
1. Ir para GitHub
2. Clicar em "Pull requests"
3. Clicar em "New pull request"
4. Selecionar: `main` ← `feature/modulo-financeiro`
5. Preencher descrição
6. Solicitar review
7. Após aprovação, fazer merge

#### Passo 6: Após Merge
```bash
# Voltar para main
git checkout main

# Atualizar main
git pull origin main

# Deletar branch local (opcional)
git branch -d feature/modulo-financeiro

# Deletar branch remota (opcional)
git push origin --delete feature/modulo-financeiro
```

---

## 🎯 Exemplo Prático: Módulo Financeiro

Vamos criar uma branch para desenvolver o módulo financeiro:

```bash
# 1. Garantir que main está atualizada
git checkout main
git pull origin main

# 2. Criar branch
git checkout -b feature/modulo-financeiro

# 3. Desenvolver
# ... criar arquivos ...
git add .
git commit -m "feat: criar modelos Financeiro (Receita, Despesa, Dizimo)"

git add .
git commit -m "feat: criar API REST para receitas"

git add .
git commit -m "feat: criar frontend de receitas"

# 4. Enviar para GitHub
git push -u origin feature/modulo-financeiro

# 5. Criar Pull Request no GitHub
# 6. Após merge, limpar branches
git checkout main
git pull origin main
git branch -d feature/modulo-financeiro
```

---

## ⚠️ Boas Práticas

### ✅ FAZER:
- Criar branch para cada feature/fix
- Usar nomes descritivos
- Fazer commits frequentes e pequenos
- Atualizar branch com main regularmente
- Deletar branches após merge
- Usar Pull Requests para code review

### ❌ EVITAR:
- Trabalhar diretamente na main
- Commits muito grandes
- Branches com nomes genéricos (ex: "teste", "nova")
- Deixar branches órfãs
- Merge direto sem review

---

## 🔧 Comandos Úteis Adicionais

### Ver Diferenças Entre Branches
```bash
# Ver diferenças entre sua branch e main
git diff main..feature/nome-da-feature

# Ver commits que estão na sua branch mas não em main
git log main..feature/nome-da-feature
```

### Renomear Branch
```bash
# Renomear branch atual
git branch -m novo-nome

# Renomear branch específica
git branch -m nome-antigo novo-nome
```

### Ver Histórico de Branches
```bash
# Ver histórico visual
git log --oneline --graph --all

# Ver histórico de uma branch
git log feature/nome-da-feature
```

---

## 📝 Checklist para Nova Feature

- [ ] Atualizar main: `git checkout main && git pull`
- [ ] Criar branch: `git checkout -b feature/nome`
- [ ] Desenvolver e commitar
- [ ] Enviar para GitHub: `git push -u origin feature/nome`
- [ ] Criar Pull Request
- [ ] Aguardar review e aprovação
- [ ] Fazer merge no GitHub
- [ ] Atualizar main local: `git checkout main && git pull`
- [ ] Deletar branch local: `git branch -d feature/nome`
- [ ] Deletar branch remota: `git push origin --delete feature/nome`

---

## 🆘 Resolução de Problemas

### Branch está desatualizada com main
```bash
# Atualizar sua branch com main
git checkout feature/nome-da-feature
git merge main
# Resolver conflitos se houver
```

### Commitei na branch errada
```bash
# Mover último commit para outra branch
git log  # Anotar hash do commit
git reset HEAD~1  # Desfazer commit (mantém alterações)
git checkout branch-correta
git cherry-pick hash-do-commit
```

### Quero descartar alterações locais
```bash
# Descartar todas as alterações não commitadas
git checkout .
# OU
git reset --hard HEAD
```

---

## 📚 Recursos Adicionais

- [Documentação oficial do Git](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Última atualização**: Janeiro 2025

