// test/specs/usuarios/usuario.spec.js

/**
 * Test Suite: Usuários
 *
 * API Base: https://serverest.dev
 *
 * Objetivo:
 * Validar os endpoints responsáveis pelo gerenciamento de usuários,
 * garantindo que operações de criação e exclusão funcionem corretamente
 * e que o contrato de resposta esteja conforme especificado.
 *
 * Estratégia de Teste:
 * - Geração dinâmica de dados para evitar conflito de duplicidade.
 * - Validação de status code esperado.
 * - Validação de contrato da resposta utilizando Joi.
 * - Garantia de independência entre cenários.
 *
 * Endpoints Cobertos:
 * - POST /usuarios
 * - DELETE /usuarios/{_id}
 *
 * Padrão aplicado:
 * - Triple A (Arrange, Act, Assert)
 * - Validação estrutural com Joi
 * - Organização por suíte de domínio
 */

const { spec } = require('pactum');
const { usuarioCreateSuccessSchema } = require('../../../src/schemas/usuario.schema.js');
const { validateJoi } = require('../../../src/utils/validator');

describe('Usuários', () => {

    /**
     * Cenário:
     * Deve criar um usuário com sucesso,
     * retornando status 201 e contrato válido conforme schema.
     *
     * Fluxo:
     * 1. Gerar payload dinâmico.
     * 2. Executar POST /usuarios.
     * 3. Validar status 201.
     * 4. Validar contrato da resposta.
     */
    it('POST /usuarios - Criação do usuário + contrato', async () => {

        // Arrange
        // Criação de massa de dados dinâmica para evitar email duplicado
        const payload = {
            nome: `Usuario QA ${Date.now()}`,
            email: `qa${Date.now()}@teste.com`,
            password: '123456',
            administrador: 'true'
        };

        // Act
        // Executa requisição de criação de usuário
        const response = await spec()
            .post('https://serverest.dev/usuarios')
            .withJson(payload)
            .expectStatus(201)
            .toss();

        // Assert
        // Validação de contrato utilizando schema Joi
        const { error } = usuarioCreateSuccessSchema.validate(response.json, { abortEarly: false });
        if (error) throw error;
    });

    /**
     * Cenário:
     * Deve excluir um usuário existente com sucesso
     * utilizando o identificador retornado na criação.
     *
     * Fluxo:
     * 1. Criar usuário (pré-condição).
     * 2. Capturar o _id retornado.
     * 3. Executar DELETE /usuarios/{_id}.
     * 4. Validar status 200.
     */
    it('DELETE /usuarios/{_id} - Exclusão do usuário por Id', async () => {

        // Arrange
        // Criação de usuário como pré-condição para exclusão
        const created = await spec()
            .post('https://serverest.dev/usuarios')
            .withJson({
                nome: `Usuario QA ${Date.now()}`,
                email: `qa${Date.now()}@teste.com`,
                password: '123456',
                administrador: 'true'
            })
            .expectStatus(201)
            .toss();

        const userId = created.json._id;

        // Act
        // Executa exclusão do usuário criado
        await spec()
            .delete(`https://serverest.dev/usuarios/${userId}`)
            .expectStatus(200);

        // Assert implícito:
        // Validação realizada via status code 200
    });

});