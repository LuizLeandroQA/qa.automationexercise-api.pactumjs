// src/clients/login.client.js

/**
 * @file login.client.js
 * @description
 * Client de domínio responsável por encapsular chamadas relacionadas
 * ao endpoint de autenticação da API (POST /login).
 *
 * Objetivo:
 * - Centralizar lógica de login.
 * - Evitar repetição de código nos testes.
 * - Melhorar organização e legibilidade dos specs.
 *
 * Este módulo NÃO contém validações de teste (asserts).
 * Ele apenas executa a requisição e retorna os dados necessários.
 */

const { pactum } = require('./api.client');

/**
 * Executa login na API.
 *
 * @param {{ email: string, password: string }} credentials
 * Credenciais do usuário.
 *
 * @returns {Promise<Object>} Corpo completo da resposta da API.
 *
 * Fluxo:
 * 1. Executa POST /login
 * 2. Envia payload com email e password
 * 3. Valida status 200
 * 4. Retorna body da resposta
 */
async function login(credentials) {
  const response = await pactum
    .spec()
    .post('/login')
    .withJson(credentials)
    .expectStatus(200)
    .toss();

  return response.body;
}

/**
 * Executa login e retorna apenas o token de autorização.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<string>} Token de autorização.
 *
 * @throws {Error} Caso a API não retorne token.
 */
async function loginComToken(credentials) {
  const body = await login(credentials);

  const token = body?.authorization;

  if (!token) {
    throw new Error('Login não retornou token de autorização.');
  }

  return token;
}

module.exports = {
  login,
  loginComToken
};