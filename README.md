# QA Automation Exercise - API Tests

## 🎯 Objetivo

Este projeto contém a automação de testes de API utilizando Node.js e PactumJS,
com foco em validação de endpoints REST, contratos de resposta (schemas),
validação de status code e regras de negócio.

A suíte cobre cenários positivos e negativos para:

- Login
- Usuários
- Produtos

---

## 🧱 Arquitetura do Projeto

O projeto segue uma arquitetura modular baseada em:

- *Clients* → Responsáveis pelas chamadas HTTP
- *Schemas* → Validação de contrato da resposta
- *Utils* → Autenticação, geração de dados e validações
- *Fixtures/Factory* → Massa de dados
- *Specs* → Testes organizados por domínio

---

## 🛠 Tecnologias Utilizadas

- Node.js
- PactumJS
- Mocha
- dotenv
- JSON Schema Validation

---

## 📁 Estrutura do Projeto

```text
qa.automationexercise-api.pactumjs
│
├── .github/
│   └── workflows/
│       └── ci.yml                  # Pipeline de CI (GitHub Actions)
│
├── node_modules/                   # Dependências do projeto
├── report/                         # Relatórios gerados após execução
│
├── src/
│   │
│   ├── clients/                    # Camada responsável por chamadas HTTP
│   │   ├── api.client.js           # Cliente base de configuração HTTP
│   │   ├── login.client.js         # Endpoints relacionados a login
│   │   ├── produtos.client.js      # Endpoints de produtos
│   │   └── usuarios.client.js      # Endpoints de usuários
│   │
│   ├── config/
│   │   ├── env.js                  # Carregamento e validação de variáveis de ambiente
│   │   └── pactum.config.js        # Configuração global do PactumJS
│   │
│   ├── data/
│   │   └── fixtures.js             # Massa de dados estática
│   │
│   ├── schemas/                    # Validação de contrato (JSON Schema)
│   │   ├── login.schema.js
│   │   ├── produto.schema.js
│   │   └── usuario.schema.js
│   │
│   └── utils/                      # Utilitários auxiliares
│       ├── auth.js                 # Manipulação de autenticação/token
│       ├── factory.js              # Geração dinâmica de dados
│       └── validator.js            # Validações reutilizáveis
│
├── test/
│   └── specs/
│       ├── login/
│       │   └── login.spec.js       # Testes de autenticação
│       │
│       ├── produtos/
│       │   └── produto.spec.js     # Testes de produtos
│       │
│       └── usuarios/
│           └── usuario.spec.js     # Testes de usuários
│
├── .env.example                    # Modelo de variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git
├── image-1.png                     # Imagem ilustrativa (README)
├── image.png                       # Imagem ilustrativa (README)
├── package.json                    # Dependências e scripts do projeto
├── package-lock.json               # Lock de versões das dependências
└── README.md                       # Documentação do projeto

---

### 📌 Organização Arquitetural

O projeto segue uma arquitetura modular baseada em separação de responsabilidades:

- *Clients* → Encapsulam chamadas HTTP
- *Schemas* → Validação de contrato (JSON Schema)
- *Utils* → Autenticação, geração de dados e validações auxiliares
- *Specs* → Cenários organizados por domínio
- *Config* → Configuração global e variáveis de ambiente

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório

```bash
git clone <url-do-repo>

---

2️⃣ Instalar dependências

npm install

---

3️⃣ Configurar variáveis de ambiente

cp .env.example .env
BASE_URL=
TOKEN=

| Variável  | Descrição                    | Valor padrão              |
|----------|-------------------------------|---------------------------|
| BASE_URL | URL base da API               | `https://serverest.dev`   |
| TIMEOUT  | Timeout das requisições (ms)  | `10000`                   |

---

▶️ Executando os Testes

Rodar todos os testes
npm test

Rodar testes por domínio
Login:
npx mocha test/specs/login/login.spec.js

Usuários:
npx mocha test/specs/usuarios/usuario.spec.js

Produtos:
npx mocha test/specs/produtos/produto.spec.js

---

📊 Relatórios

Os relatórios são gerados na pasta:
/report