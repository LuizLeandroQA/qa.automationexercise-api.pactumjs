// src/clients/produtos.client.js

/**
 * @file produtos.client.js
 * @description
 * Client de domínio responsável por encapsular chamadas relacionadas
 * ao recurso de Produtos na API (POST /produtos).
 *
 * Objetivo:
 * - Centralizar chamadas do domínio de produtos.
 * - Evitar repetição de código nos testes.
 * - Manter os specs mais legíveis e organizados.
 *
 * Observação:
 * - A criação de produto exige autenticação.
 * - O header Authorization deve conter o token retornado no login.
 * - Este módulo não contém validações de contrato (Joi).
 */

const { pactum } = require('./api.client');

/**
 * Cria um produto autenticado na API.
 *
 * @param {string} token Token de autorização retornado no login.
 * @param {Object} payload Dados do produto.
 * @param {string} payload.nome Nome do produto.
 * @param {number} payload.preco Preço do produto.
 * @param {string} payload.descricao Descrição do produto.
 * @param {number} payload.quantidade Quantidade disponível.
 *
 * @returns {Promise<Object>} Resposta completa do Pactum (toss),
 * contendo status, headers e body.
 *
 * Fluxo:
 * 1. POST /produtos
 * 2. Envia header Authorization
 * 3. Envia payload JSON
 * 4. Espera status 201
 */
async function criarProduto(token, payload) {
  return pactum
    .spec()
    .post('/produtos')
    .withHeaders({ Authorization: token })
    .withJson(payload)
    .expectStatus(201)
    .toss();
}

module.exports = {
  criarProduto,
};