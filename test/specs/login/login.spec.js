// test/specs/login/login.spec.js

/**
 * Test Suite: Login - POST /login
 *
 * API Base: https://serverest.dev
 *
 * Objetivo:
 * Validar o comportamento do endpoint de autenticação da aplicação,
 * garantindo que um usuário previamente cadastrado consiga realizar login
 * com sucesso e que o contrato da resposta esteja conforme o esperado.
 *
 * Estratégia de Teste:
 * - Utilização de geração dinâmica de massa de dados (factory).
 * - Criação de usuário como pré-condição do teste.
 * - Validação de status code.
 * - Validação de contrato da resposta utilizando Joi.
 *
 * Fluxo do Teste:
 * 1. Criar um novo usuário via POST /usuarios (pré-condição).
 * 2. Realizar login via POST /login com as credenciais criadas.
 * 3. Validar status code 200.
 * 4. Validar contrato da resposta com schema Joi.
 *
 * Cobertura:
 * - Endpoint: POST /usuarios
 * - Endpoint: POST /login
 * - Status esperados: 201 (criação) e 200 (login)
 * - Validação estrutural da resposta de login
 *
 * Dependências:
 * - factory.js → Geração de usuário dinâmico
 * - login.schema.js → Schema Joi de validação
 * - validator.js → Função utilitária para validação de contrato
 */

const { spec } = require('pactum');
const { novoUsuario } = require('../../../src/utils/factory');
const { loginSuccessSchema } = require('../../../src/schemas/login.schema');
const { validateJoi } = require('../../../src/utils/validator');

describe('Login - POST /login', () => {

    /**
     * Cenário:
     * Deve cadastrar um novo usuário com sucesso (pré-condição)
     * e realizar login com as credenciais criadas,
     * retornando status 200 e contrato válido.
     */
    it('Cadastro com sucesso (pré-condição) + login com sucesso', async () => {

        // Arrange
        // Geração dinâmica de um novo usuário válido
        const user = novoUsuario();

        // Criação do usuário para garantir pré-condição do login
        await spec()
            .post('https://serverest.dev/usuarios')
            .withJson(user)
            .expectStatus(201);

        // Act
        // Realiza login com as credenciais criadas
        const body = await spec()
            .post('https://serverest.dev/login')
            .withJson({ email: user.email, password: user.password })
            .expectStatus(200)
            .returns('body');

        // Assert
        // Validação do contrato da resposta utilizando Joi
        validateJoi(loginSuccessSchema, body);
    });
});