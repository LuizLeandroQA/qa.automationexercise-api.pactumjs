// src/clients/usuarios.client.js

/**
 * @file usuarios.client.js
 * @description
 * Client de domínio responsável por encapsular chamadas relacionadas
 * ao recurso de Usuários na API (POST /usuarios e DELETE /usuarios/{_id}).
 *
 * Objetivo:
 * - Centralizar chamadas do domínio de usuários.
 * - Evitar repetição de código nos testes.
 * - Manter os specs mais legíveis (foco em Arrange/Act/Assert).
 *
 * Observação:
 * - Este client NÃO realiza validações de contrato (Joi) nem asserts de teste.
 * - Ele executa requisições e retorna dados úteis para os testes.
 */

const { pactum } = require('./api.client');

/**
 * Cria um usuário na API.
 *
 * @param {Object} payload Dados do usuário.
 * @param {string} payload.nome Nome do usuário.
 * @param {string} payload.email Email do usuário.
 * @param {string} payload.password Senha do usuário.
 * @param {string} payload.administrador "true" | "false".
 *
 * @returns {Promise<Object>} Resposta completa do Pactum (toss),
 * contendo status, headers e body.
 *
 * Fluxo:
 * 1. POST /usuarios
 * 2. Envia payload JSON
 * 3. Espera status 201
 */
async function criarUsuario(payload) {
  return pactum
    .spec()
    .post('/usuarios')
    .withJson(payload)
    .expectStatus(201)
    .toss();
}

/**
 * Cria um usuário e retorna apenas o ID (_id).
 *
 * @param {Object} payload Dados do usuário.
 * @returns {Promise<string>} ID do usuário criado.
 *
 * @throws {Error} Caso a API não retorne _id.
 */
async function criarUsuarioEObterId(payload) {
  const res = await criarUsuario(payload);
  const id = res?.body?._id;

  if (!id) {
    throw new Error('Criação de usuário não retornou _id.');
  }

  return id;
}

/**
 * Exclui um usuário pelo ID.
 *
 * @param {string} userId ID do usuário.
 * @returns {Promise<Object>} Resposta completa do Pactum (toss).
 *
 * Fluxo:
 * 1. DELETE /usuarios/{_id}
 * 2. Espera status 200
 */
async function deletarUsuarioPorId(userId) {
  return pactum
    .spec()
    .delete(/usuarios/${userId})
    .expectStatus(200)
    .toss();
}

module.exports = {
  criarUsuario,
  criarUsuarioEObterId,
  deletarUsuarioPorId,
};