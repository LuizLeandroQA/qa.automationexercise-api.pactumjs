// test/specs/produtos/produto.spec.js
const { spec } = require('pactum');
const { novoUsuario, novoProduto } = require('../../../src/utils/factory.js');
const { produtoCreateSuccessSchema } = require('../../../src/schemas/produto.schema.js');
const { validateJoi } = require('../../../src/utils/validator.js');

/**
 * Suite: Produtos
 *
 * Objetivo:
 * Validar o endpoint de criação de produtos da API (Serverest),
 * garantindo:
 * - fluxo de autenticação (pré-condição) para obter token
 * - criação de produto com status esperado
 * - validação de contrato (schema Joi) da resposta
 *
 * Observação importante:
 * O Serverest exige autenticação para criar produtos.
 * Por isso o teste inclui:
 * 1) criação de usuário
 * 2) login para obtenção do token (authorization)
 * 3) criação do produto usando o header Authorization
 */
describe('Produtos', () => {
  /**
   * Cenário:
   * POST /produtos - Cadastro de produto + contrato
   *
   * Pré-condições (Arrange):
   * 1. Gerar massa dinâmica de usuário (novoUsuario).
   * 2. Criar o usuário via POST /usuarios (status 201).
   * 3. Realizar login via POST /login para obter authorization (token) (status 200).
   * 4. Gerar massa dinâmica de produto (novoProduto).
   *
   * Ação (Act):
   * 5. Criar o produto via POST /produtos com Authorization e payload do produto (status 201).
   *
   * Asserções (Assert):
   * 6. Validar contrato (Joi) do retorno do cadastro de produto (produtoCreateSuccessSchema).
   *
   * Resultado esperado:
   * - A API deve retornar 201 ao cadastrar o produto
   * - O corpo da resposta deve respeitar o schema definido (contrato)
   */
  it('POST /produtos - Cadastro de produto + contrato', async () => {
    // Arrange
    // Gera dados dinâmicos para evitar duplicidade (email) e manter o teste idempotente
    const user = novoUsuario();

    // Pré-condição: cria usuário para possibilitar autenticação
    await spec()
      .post('https://serverest.dev/usuarios')
      .withJson(user)
      .expectStatus(201);

    // Login: obtém resposta completa para extrair token de autorização
    const loginRes = await spec()
      .post('https://serverest.dev/login')
      .withJson({ email: user.email, password: user.password })
      .expectStatus(200)
      .toss();

    // Token de autenticação retornado pelo Serverest
    const token = loginRes?.body?.authorization;

    // Segurança extra: garante que o token veio antes de prosseguir
    // (evita criar produto sem auth e facilita debug em caso de falha)
    if (!token) {
      throw new Error(
        `Login não retornou authorization. Body: ${JSON.stringify(loginRes?.body)}`
      );
    }

    // Gera payload de produto dinamicamente para o cadastro
    const produto = novoProduto();

    // Act (cria produto)
    const createRes = await spec()
      .post('https://serverest.dev/produtos')
      // O token já vem no formato aceito pela API (ex.: "Bearer ..."), então enviamos diretamente
      .withHeaders({ Authorization: token })
      .withJson(produto)
      .expectStatus(201)
      .toss();

    // Assert (contrato com Joi)
    // Valida o corpo da resposta retornada no cadastro do produto contra o schema esperado
    validateJoi(produtoCreateSuccessSchema, createRes.body);
  });
});