// src/clients/api.client.js

/**
 * @file api.client.js
 * @description
 * Configuração central do cliente HTTP utilizado nos testes de API.
 *
 * Objetivo:
 * - Inicializar o PactumJS com configurações globais.
 * - Aplicar baseUrl e timeout definidos no módulo de ambiente (env).
 * - Garantir que todos os specs utilizem uma configuração padronizada.
 *
 * Responsabilidades:
 * - Importar configurações de ambiente.
 * - Aplicar baseUrl global para evitar repetição de URL nos testes.
 * - Aplicar timeout padrão para controlar tempo máximo de requisição.
 *
 * Benefícios:
 * - Centralização da configuração de comunicação HTTP.
 * - Facilidade de manutenção (alterar baseUrl ou timeout em um único local).
 * - Padronização de comportamento em todos os testes.
 *
 * Observação:
 * - Este arquivo não contém lógica de teste.
 * - Apenas configura o cliente Pactum antes da execução dos specs.
 */

const pactum = require('pactum');
const { baseUrl, timeout } = require('../config/env');

/**
 * Configurações globais do Pactum
 * - Define baseUrl da API
 * - Define timeout padrão
 */
pactum.request.setBaseUrl(baseUrl);
pactum.request.setDefaultTimeout(timeout);

/**
 * Exporta a instância configurada do Pactum
 * para reutilização nos clients e specs.
 */
module.exports = { pactum };