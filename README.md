# Sistema Igreja - Plataforma de Gestão 100% em Nuvem
Este projeto é uma solução completa para o gerenciamento de igrejas, com módulos essenciais como cadastro de membros, emissão de certificados, controle financeiro, sala virtual e mais. Ele utiliza tecnologias modernas para garantir desempenho, segurança e facilidade de uso.

## 🎯 Objetivos do Projeto
- Facilitar a gestão administrativa de igrejas de qualquer tamanho
- Centralizar informações de membros, finanças e eventos em uma única plataforma
- Oferecer uma experiência segura e intuitiva para usuários com diferentes níveis técnicos
- Possibilitar acesso remoto a informações e funções administrativas por meio de nuvem
## ✅ Tecnologias Utilizadas
### Backend:
- **Django** - Framework Python para desenvolvimento web rápido e seguro
- **Django Rest Framework** - Toolkit poderoso para construção de APIs RESTful
- **Autenticação personalizada com `usuarios.User`** - Modelo personalizado para maior flexibilidade
- **CORS configurado para integração** - Permite comunicação segura entre frontend e backend
- **SQLite (desenvolvimento) / PostgreSQL (produção)** - Banco de dados escalável
- **Deploy: Railway (previsto)** - Plataforma moderna para deploy simplificado

### Frontend:
- **React 18** - Biblioteca JavaScript para interfaces dinâmicas com React Hooks
- **TailwindCSS 3.4.7** - Framework CSS utilitário para design responsivo
- **React Router DOM 7.6** - Navegação declarativa para aplicações React
- **Chart.js e React-Chartjs-2** - Visualização de dados com gráficos interativos

### Requisitos do Sistema:
- **Node.js** v16.0+ e npm v8.0+
- **Python** v3.9+
- **pip** v22.0+
---
## 📌 Status Atual do Projeto
### ✅ Concluído até agora:
- Estrutura base Django + React integrada
- Modelo de usuário personalizado configurado (`usuarios.User`)
- App `usuarios` e autenticação funcional
- Projeto React criado e funcionando com TailwindCSS 3.4.7
- Frontend já com layout inicial e dashboard básico em andamento
- Primeiros commits feitos e versionamento no Git iniciado
- **Backend acessível, CORS configurado corretamente**
- **Rota api/test/ funcionando como esperado**
- **Conexão entre frontend (React) e backend (Django) estabelecida**
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

### Pré-requisitos
- Git instalado
- Python 3.9+ e pip instalados
- Node.js 16.0+ e npm instalados

### Backend (Django)
```bash
# Clonar o repositório (se ainda não tiver feito)
git clone https://github.com/seu-usuario/sistema-igreja.git
cd sistema-igreja/backend

# Criar e ativar ambiente virtual
python -m venv env
source env/bin/activate  # Linux/Mac
env\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env  # Copiar arquivo de exemplo e ajustar conforme necessário

# Configurar banco de dados
python manage.py makemigrations
python manage.py migrate

# Iniciar servidor de desenvolvimento
python manage.py runserver
```

### Frontend (React)
```bash
# Navegar até diretório do frontend
cd ../frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

### Verificando a Instalação
- Backend estará disponível em: http://localhost:8000/
- API será acessível em: http://localhost:8000/api/
- Frontend estará disponível em: http://localhost:3000/
- Rota de teste: http://localhost:8000/api/test/
## 📁 Estrutura do Projeto
```
sistema_igreja/
├── backend/                 # Projeto Django
│   ├── manage.py            # Script de gerenciamento Django
│   ├── sistema/             # Configurações principais
│   ├── usuarios/            # App de autenticação personalizada
│   ├── requirements.txt     # Dependências Python
│   └── .env.example         # Exemplo de variáveis de ambiente
├── frontend/                # Aplicação React
│   ├── public/              # Arquivos estáticos
│   ├── src/                 # Código-fonte React
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   └── App.js           # Componente principal
│   ├── package.json         # Dependências JavaScript
│   └── tailwind.config.js   # Configuração do Tailwind
├── README.md                # Este arquivo
└── ROADMAP.md               # Planejamento de desenvolvimento
```
## 🧠 Contribuição

### Guia de Contribuição
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Implemente suas mudanças
4. Execute os testes (quando implementados)
5. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`)
6. Envie para a branch remota (`git push origin feature/nova-funcionalidade`)
7. Abra um Pull Request

### Sincronização (Desenvolvimento em 2 dispositivos)
- Faça `git clone` do repositório nas duas máquinas
- Use `git pull` antes de começar a trabalhar para obter mudanças recentes
- Faça commits claros e objetivos
- Use branches para novas features se necessário
- Evite trabalhar simultaneamente nos mesmos arquivos em ambos dispositivos

### Padrões de Código
- Python: PEP 8
- JavaScript: ESLint com configuração padrão do React
- Commits: Use mensagens claras e concisas, prefixadas pelo tipo de alteração
  (ex: `feat: adiciona autenticação`, `fix: corrige problema de CORS`)

### Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE.md para detalhes.
## 📞 Suporte e Contato

Se você encontrar problemas ou tiver dúvidas sobre o projeto:
- Abra uma issue no GitHub
- Entre em contato com o desenvolvedor principal: maykon@exemplo.com
- Consulte a documentação na Wiki do projeto (em desenvolvimento)

---

Desenvolvido com 💻 por Maykon Douglas