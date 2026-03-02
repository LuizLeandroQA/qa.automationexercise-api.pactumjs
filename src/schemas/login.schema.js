// src/schemas/login.schema.js

/**
 * Schema de Contrato: Login com Sucesso
 *
 * API: POST /login
 * Base: https://serverest.dev
 *
 * Objetivo:
 * Validar a estrutura da resposta retornada quando o login
 * é realizado com credenciais válidas.
 *
 * Estrutura esperada:
 * {
 *   message: string,
 *   authorization: string
 * }
 *
 * Regras:
 * - message deve ser uma string obrigatória
 * - authorization deve ser uma string obrigatória
 *
 * Observações:
 * - Não valida o conteúdo exato da mensagem, apenas sua existência.
 * - Não valida o formato do token, apenas sua presença.
 * - A validação estrutural é realizada via utilitário validateJoi.
 *
 * Benefícios:
 * - Garante conformidade do contrato da API.
 * - Evita que mudanças estruturais passem despercebidas.
 * - Separa validação de contrato da lógica de teste.
 */

const Joi = require('joi');

/**
 * Schema Joi para resposta de login bem-sucedido.
 */
const loginSuccessSchema = Joi.object({
  message: Joi.string().required(),
  authorization: Joi.string().required()
});

module.exports = { loginSuccessSchema };