# Desafio - Sistema de Gerenciamento de Notícias

Aplicação fullstack para gerenciamento de notícias com React (frontend) e NestJS (backend).

## Estrutura do Projeto

```
desafio/
├── prova-frontend/      # React 19 + TypeScript + Material-UI
├── prova-backend/       # NestJS 11 + TypeORM + PostgreSQL
├── docker-compose.yml   # Orquestração completa dos serviços
└── README.md           # Este arquivo
```

## Stack Tecnológico

### Frontend
- React 19.2.1
- TypeScript 4.9.5
- Material-UI 7.3.6
- React Router 7.10.1
- Axios 1.13.2

### Backend
- NestJS 11
- Fastify (HTTP server)
- TypeORM 0.3
- PostgreSQL 15
- Cache em memória

## Como Começar

### Pré-requisitos

- **Git** - Para clonar o repositório
- **Docker** e **Docker Compose** - Para executar a aplicação em containers
- **Node.js 18+** e **npm** (opcional) - Apenas se for executar localmente sem Docker

### Início Rápido com Docker

1. **Clone o repositório**

```bash
git clone https://github.com/DaviMarinho/desafio-integrado.git
cd desafio-integrado
```

2. **Configure as variáveis de ambiente** (opcional - já vem com valores padrão)

```bash
# Backend
cp prova-backend/.env.example prova-backend/.env

# Frontend
cp prova-frontend/.env.example prova-frontend/.env
```

3. **Inicie todos os serviços com Docker**

```bash
docker compose up -d
```

Este comando irá:
- Baixar as imagens necessárias
- Criar e iniciar o container PostgreSQL
- Criar e iniciar o container do Backend (NestJS)
- Criar e iniciar o container do Frontend (React)

4. **Aguarde os serviços iniciarem** (cerca de 30-60 segundos)

Verifique o status dos containers:

```bash
docker compose ps
```

Acompanhe os logs:

```bash
# Ver todos os logs
docker compose logs -f

# Ver apenas logs do backend
docker compose logs -f backend

# Ver apenas logs do frontend
docker compose logs -f frontend
```

5. **Acesse a aplicação**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

6. **Testar a API**

```bash
# Criar uma notícia
curl -X POST http://localhost:3001/noticias \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Primeira Notícia","descricao":"Teste de integração"}'

# Listar notícias
curl http://localhost:3001/noticias
```

### Parar a Aplicação

```bash
# Parar todos os containers
docker compose down

# Parar e remover volumes (limpa o banco de dados)
docker compose down -v
```

## Configuração Inicial

### 1. Variáveis de Ambiente

#### Backend (`prova-backend/.env`)
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres123
DB_DATABASE=prova_db
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (`prova-frontend/.env`)
```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_VIACEP_URL=https://viacep.com.br/ws
```

### 2. Instalação de Dependências

```bash
# Backend
cd prova-backend
npm install

# Frontend
cd ../prova-frontend
npm install
```

## Formas de Executar

### Opção 1: Docker Compose (Recomendado)

Inicia todos os serviços (PostgreSQL, Backend, Frontend) com um único comando:

```bash
# Na raiz do projeto
docker-compose up

# Ou em modo detached (background)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar tudo
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v
```

**Acessos:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

### Opção 2: Desenvolvimento Local

#### 1. Iniciar PostgreSQL
```bash
docker-compose up -d postgres
```

#### 2. Iniciar Backend
```bash
cd prova-backend
npm run start:dev
```

#### 3. Iniciar Frontend
```bash
cd prova-frontend
npm run dev
```

## Endpoints da API

| Método | Endpoint         | Descrição                      |
|--------|------------------|--------------------------------|
| POST   | /noticias        | Criar notícia                  |
| GET    | /noticias        | Listar com paginação e busca   |
| GET    | /noticias/:id    | Buscar por ID                  |
| PATCH  | /noticias/:id    | Atualizar notícia              |
| DELETE | /noticias/:id    | Deletar notícia                |

### Parâmetros de Query (GET /noticias)

- `page` (opcional, padrão: 1)
- `limit` (opcional, padrão: 10, máx: 100)
- `search` (opcional) - busca em título e descrição

### Exemplo de Uso

```bash
# Criar notícia
curl -X POST http://localhost:3001/noticias \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Teste","descricao":"Descrição teste"}'

# Listar com busca
curl "http://localhost:3001/noticias?page=1&limit=10&search=teste"

# Buscar por ID
curl http://localhost:3001/noticias/1

# Atualizar
curl -X PATCH http://localhost:3001/noticias/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Atualizado"}'

# Deletar
curl -X DELETE http://localhost:3001/noticias/1
```

## Recursos do Frontend

### Páginas Disponíveis

1. **Busca CEP** (`/`)
   - Consulta ViaCEP
   - CSS manual (sem Material-UI)
   - Validação e formatação de CEP

2. **Login** (`/login`)
   - Autenticação fake (aceita qualquer credencial)
   - Material-UI
   - Armazena token em localStorage

3. **Notícias** (`/noticias`) - Protegida
   - CRUD completo
   - Paginação
   - Busca em tempo real (debounced)
   - Material-UI com DataGrid

## Testes

### Backend
```bash
cd prova-backend

# Testes unitários
npm run test

# Testes E2E (requer PostgreSQL rodando)
docker-compose up -d postgres
npm run test:e2e

# Cobertura
npm run test:cov
```

### Frontend
```bash
cd prova-frontend

# Modo interativo
npm test

# Executar uma vez
npm test -- --watchAll=false

# Com cobertura
npm test -- --coverage
```

## Arquitetura

### Backend (NestJS)

```
src/
├── noticias/           # Módulo de notícias
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades TypeORM
│   ├── noticias.controller.ts
│   └── noticias.service.ts
├── common/
│   └── cache/          # Sistema de cache global
└── main.ts             # Bootstrap com Fastify + CORS
```

**Características:**
- Validação global com `class-validator`
- CORS configurado para `localhost:3000`
- Cache em memória para listagens
- TypeORM com `synchronize: true` em desenvolvimento

### Frontend (React)

```
src/
├── components/         # Componentes reutilizáveis
│   ├── Layout.tsx
│   ├── PrivateRoute.tsx
│   └── Loading.tsx
├── pages/              # Páginas/rotas
│   ├── BuscaCep/
│   ├── Login/
│   └── Noticias/
├── services/           # Chamadas API
│   ├── api.ts          # Axios configurado
│   ├── cep.service.ts
│   └── noticias.service.ts
├── hooks/              # Custom hooks
│   └── useAuth.tsx
└── types/              # TypeScript types
```

**Características:**
- Context API para autenticação
- Lazy loading de rotas protegidas
- Interceptors Axios (token + erro 401)
- Debounce na busca (500ms)

## Integração Frontend-Backend

### Fluxo de Dados

1. **Autenticação**
   - Login fake armazena token em `localStorage`
   - Axios interceptor adiciona `Bearer token` em todas as requests
   - Backend ignora autenticação (não implementada)

2. **CRUD de Notícias**
   - Frontend chama `noticias.service.ts`
   - Serviço usa `api.ts` (Axios configurado)
   - Backend valida DTOs e retorna erros em português
   - Cache automaticamente invalidado em operações write

3. **Paginação**
   - Frontend envia: `page`, `limit`, `search`
   - Backend retorna: `{ data, total, page, limit, totalPages }`
   - Frontend normaliza resposta para compatibilidade

### CORS

Backend aceita requests de:
- `http://localhost:3001` (frontend dev)
- Configurável via `FRONTEND_URL` env var

## Troubleshooting

### Erro de conexão com banco

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps

# Reiniciar PostgreSQL
docker-compose restart postgres

# Ver logs do banco
docker-compose logs postgres
```

### Conflito de portas

```bash
# Frontend (porta 3000)
lsof -ti:3000 | xargs kill -9

# Backend (porta 3001)
lsof -ti:3001 | xargs kill -9

# PostgreSQL (porta 5432)
lsof -ti:5432 | xargs kill -9
```

### Hot reload não funciona no Docker

- Certifique-se de que `CHOKIDAR_USEPOLLING=true` está definido no frontend

### Erro "Cannot find module" após npm install

```bash
# Remover node_modules e reinstalar
cd prova-backend
rm -rf node_modules package-lock.json
npm install

cd ../prova-frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend retorna erro 500 ao criar notícia

- Verifique se o PostgreSQL está acessível
- Confirme que as credenciais do `.env` estão corretas
- Veja os logs: `docker-compose logs backend`

## Documentação Detalhada

Para detalhes de implementação, consulte:
- Backend: `prova-backend/README.md`
- Frontend: `prova-frontend/README.md`

## Licença

Projeto desenvolvido como desafio técnico.
