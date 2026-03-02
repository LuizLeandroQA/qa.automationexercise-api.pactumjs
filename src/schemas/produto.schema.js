// src/schemas/produto.schema.js

/**
 * Schema de Contrato: Criação de Produto com Sucesso
 *
 * API: POST /produtos
 * Base: https://serverest.dev
 *
 * Objetivo:
 * Validar a estrutura da resposta retornada quando um produto
 * é criado com sucesso na aplicação.
 *
 * Estrutura esperada da resposta:
 * {
 *   message: string,
 *   _id: string
 * }
 *
 * Regras de Validação:
 * - message: campo obrigatório do tipo string, indicando sucesso da operação.
 * - _id: campo obrigatório do tipo string, representando o identificador único do produto criado.
 *
 * Observações Técnicas:
 * - A validação é estrutural (contrato), não valida o conteúdo literal da mensagem.
 * - Caso a API altere a estrutura do retorno (ex: remova _id ou altere o tipo),
 *   o teste falhará imediatamente.
 * - A execução da validação ocorre através do utilitário validateJoi.
 *
 * Benefícios:
 * - Garante conformidade do contrato da API.
 * - Protege contra regressões estruturais.
 * - Mantém separação clara entre lógica de teste e validação de contrato.
 */

const Joi = require('joi');

/**
 * Schema Joi responsável por validar o retorno
 * de sucesso na criação de produto.
 */
const produtoCreateSuccessSchema = Joi.object({
  message: Joi.string().required(),
  _id: Joi.string().required()
}).required();

module.exports = { produtoCreateSuccessSchema };