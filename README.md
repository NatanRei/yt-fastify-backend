# 📹 Forms API - Curso YouTube

> **Este projeto é parte de uma série de vídeos no YouTube!**
> 
> 🎬 **Confira a playlist completa:** [yt-fastify-backend](https://www.youtube.com/playlist?list=PLB-3OHBAr0mJj6Ch-zGA5xH8qfu_4p_mJ)
> 
> Aprenda construindo uma API REST profissional com Fastify, Prisma e TypeScript!

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas bem definida:

```
src/
├── @types/          # Type definitions customizadas para Fastify
├── decorators.ts    # Middleware de autenticação
├── app.ts          # Configuração e setup do Fastify
├── server.ts       # Inicialização do servidor
├── env/            # Validação e gerenciamento de variáveis de ambiente
├── errors/         # Classes customizadas de erro
├── factories/      # Factory Pattern para injeção de dependências
├── http/
│   ├── controllers/  # Handlers das rotas
│   └── repositories/ # Padrão Repository para acesso a dados
├── lib/            # Utilitários (Prisma client)
└── services/       # Lógica de negócio
```

### Padrões utilizados:
- **Repository Pattern**: Abstração da camada de dados
- **Factory Pattern**: Injeção de dependências
- **Service Layer**: Separação da lógica de negócio
- **Error Handling**: Classes de erro customizadas

## 🚀 Comandos

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor em modo watch com recarregamento automático.

### Build
```bash
npm run build
```
Compila o TypeScript para JavaScript na pasta `dist/`.

### Produção
```bash
npm run start
```
Executa o servidor compilado.

### Banco de Dados
```bash
npm run db:migrate
```
Executa migrações Prisma e sincroniza o schema.

```bash
npm run db:generate
```
Gera types do Prisma client baseado no schema.

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado em [`.env.example`](.env.example):

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="file:./dev.db"
JWT_SECRET=sua_chave_secreta_aqui
FRONTEND_URL=http://localhost:5173
```

## 📌 Endpoints

### Autenticação
- `POST /users/login` - Login de usuário
- `DELETE /users/logout` - Logout de usuário (autenticado)

### Usuários
- `POST /users` - Criar usuário (autenticado)
- `GET /users` - Listar usuários (autenticado)
- `GET /users/:id` - Detalhes do usuário (autenticado)
- `PUT /users/:id` - Atualizar usuário (autenticado)
- `DELETE /users/:id` - Deletar usuário (autenticado)

## 🛠️ Tech Stack

- **Framework**: [Fastify](https://www.fastify.io/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**: SQLite
- **Autenticação**: JWT + Cookies HTTP-only
- **Validação**: [Zod](https://zod.dev/)
- **Segurança**: bcryptjs para hash de senhas

## 📚 Estrutura de Camadas

### Controllers (`src/http/controllers/`)
Handlers das requisições HTTP, validação de entrada com Zod.

### Services (`src/services/`)
Lógica de negócio centralizada (autenticação, criação, atualização, etc).

### Repositories (`src/http/repositories/`)
Interface de acesso a dados com implementação Prisma.

### Factories (`src/factories/`)
Criação e injeção de dependências entre services e repositories.

## 🎓 O Que Você Aprende

- ✅ Arquitetura em camadas
- ✅ SOLID principles
- ✅ Padrão Repository e Factory
- ✅ Fastify na prática
- ✅ Prisma ORM
- ✅ TypeScript avançado

---

**Desenvolvido com ❤️ para a comunidade**