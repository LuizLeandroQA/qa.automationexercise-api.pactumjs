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

Variável	Descrição	                    Valor padrão

BASE_URL	URL base da API	                https://serverest.dev

TIMEOUT	    Timeout das requisições (ms)	10000

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