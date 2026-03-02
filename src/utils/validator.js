// src/utils/validator.js

/**
 * Utilitário de Validação de Contrato
 *
 * Objetivo:
 * Centralizar a validação de contratos de resposta da API utilizando Joi,
 * garantindo que o payload retornado esteja conforme o schema esperado.
 *
 * Estratégia:
 * - Utilização de Joi para validação estrutural.
 * - abortEarly: false → retorna todos os erros de validação (não apenas o primeiro).
 * - allowUnknown: true → permite campos adicionais na resposta sem quebrar o teste.
 * - Uso de assert.fail para interromper o teste em caso de contrato inválido.
 *
 * Benefícios:
 * - Padronização da validação de contrato.
 * - Melhor legibilidade nos testes (evita repetição de lógica).
 * - Mensagens de erro claras e detalhadas.
 *
 * Quando utilizar:
 * - Após requisições que exigem validação estrutural da resposta.
 * - Em cenários onde a API possui contrato definido (ex: criação de usuário, login, criação de produto).
 */

const assert = require('assert');

/**
 * Valida um payload contra um schema Joi.
 *
 * @param {Object} schema - Schema Joi esperado para validação.
 * @param {Object} payload - Corpo da resposta retornado pela API.
 * @param {Object} [options={}] - Opções adicionais para sobrescrever comportamento padrão do Joi.
 *
 * Fluxo:
 * 1. Executa validação do payload contra o schema.
 * 2. Caso existam erros, agrega todas as mensagens.
 * 3. Interrompe o teste utilizando assert.fail com mensagem detalhada.
 *
 * @throws {AssertionError} Caso o contrato não esteja conforme o schema.
 */
function validateJoi(schema, payload, options = {}) {
  const { error } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
    ...options
  });

  if (error) {
    assert.fail(
      `Contrato inválido (Joi):\n${error.details
        .map((d) => d.message)
        .join('\n')}`
    );
  }
}

module.exports = { validateJoi };