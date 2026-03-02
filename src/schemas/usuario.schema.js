// src/schemas/usuario.schema.js

/**
 * Schema de Contrato: Criação de Usuário com Sucesso
 *
 * API: POST /usuarios
 * Base: https://serverest.dev
 *
 * Objetivo:
 * Validar a estrutura da resposta retornada quando um usuário
 * é criado com sucesso na aplicação.
 *
 * Estrutura esperada da resposta:
 * {
 *   message: string,
 *   _id: string
 * }
 *
 * Regras:
 * - message: deve existir e ser string.
 * - _id: deve existir e ser string (identificador único do usuário criado).
 *
 * Observações Técnicas:
 * - Este schema valida apenas estrutura, não o conteúdo exato da mensagem.
 * - A validação é executada via utilitário validateJoi.
 * - Caso a API altere o contrato (ex: renomeie _id),
 *   o teste falhará imediatamente.
 *
 * Benefícios:
 * - Garante integridade do contrato da API.
 * - Protege contra mudanças estruturais inesperadas.
 * - Mantém separação clara entre lógica de teste e validação de contrato.
 */

const Joi = require('joi');

/**
 * Schema Joi responsável por validar o retorno
 * de sucesso na criação de usuário.
 */
const usuarioCreateSuccessSchema = Joi.object({
  message: Joi.string().required(),
  _id: Joi.string().required()
}).required();

module.exports = { usuarioCreateSuccessSchema };