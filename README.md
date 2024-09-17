# Crud Api

Este é um projeto de API simples desenvolvido em Node.js e TypeScript, utilizando PostgreSQL como banco de dados. A API permite operações CRUD básicas em produtos.

⭐ Este é um projeto desenvolvido no curso **Curso TypeScript no Back-end (API NodeJS + TypeORM + PostgreSQL)** do [Especializa TI](https://academy.especializati.com.br/)

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Docker

## Configuração e Execução

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js e npm instalados

### Instalação ⚙️

1. Clone o repositório:

```bash
git clone https://github.com/dev-araujo/ts-back-end.git
```

2. Instale as dependências do projeto:

```bash
npm install
```

### Execução ▶️

1. Inicie o banco de dados com Docker Compose:

```bash
docker-compose up -d
```

2. Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

3. Acesse a API em `http://localhost:8080` se você não definiu nenhuma outra porta no `.env`

## Endpoints da API 🔗

- `POST /api/products`: Cria um novo produto.
- `GET /api/products`: Lista todos os produtos.
- `GET /api/products/:id`: Obtém um produto pelo ID.
- `PUT /api/products/:id`: Atualiza um produto pelo ID.
- `DELETE /api/products/:id`: Remove um produto pelo ID.

---

### Author 👷

<img src="https://user-images.githubusercontent.com/97068163/149033991-781bf8b6-4beb-445a-913c-f05a76a28bfc.png" width="5%" alt="caricatura do autor desse repositório"/>

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/araujocode/)
