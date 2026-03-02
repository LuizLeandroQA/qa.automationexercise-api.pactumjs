// pactum.config.js

/**
 * Pactum Global Configuration (documentação)
 *
 * Este arquivo existe para padronizar e documentar configurações globais
 * que podem ser usadas futuramente (ex.: baseUrl, timeout padrão, headers).
 *
 * Importante:
 * - No estado atual, NÃO altera o comportamento dos testes.
 * - Seus specs continuam chamando as URLs completas (ex: https://serverest.dev/login),
 *   então não há dependência de baseUrl global.
 *
 * Se no futuro você quiser simplificar os specs para usar paths relativos:
 * - .post('/login')
 * Aí sim você pode habilitar baseUrl global (com cuidado).
 */

// const { request } = require('pactum');
// const BASE_URL = process.env.API_BASE_URL || 'https://serverest.dev';
// const TIMEOUT = Number(process.env.API_TIMEOUT || 5000);

// request.setBaseUrl(BASE_URL);
// request.setDefaultTimeout(TIMEOUT);

// module.exports = { BASE_URL, TIMEOUT };

module.exports = {};