// src/utils/auth.js

/**
 * @file auth.js
 * @description
 * Utilitário responsável por encapsular lógica de autenticação
 * na API Serverest.
 *
 * Objetivo:
 * - Centralizar chamada de login.
 * - Retornar token de autorização.
 * - Evitar duplicação de código nos specs.
 *
 * Observação:
 * - Este módulo não contém validações de teste.
 * - Apenas executa login e retorna dados úteis.
 */

const { pactum } = require('../clients/api.client');

/**
 * Realiza login na API e retorna o token de autorização.
 *
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<string>} Token de autorização.
 * @throws {Error} Caso a API não retorne authorization.
 */
async function obterToken(email, password) {
  const response = await pactum
    .spec()
    .post('/login')
    .withJson({ email, password })
    .expectStatus(200)
    .toss();

  const token = response?.body?.authorization;

  if (!token) {
    throw new Error('Login não retornou token de autorização.');
  }

  return token;
}

module.exports = { obterToken };