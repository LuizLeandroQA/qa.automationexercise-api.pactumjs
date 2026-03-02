// src/config/env.js

/**
 * @file env.js
 * @description
 * Centraliza as configurações de ambiente da aplicação de testes de API.
 *
 * Objetivo:
 * - Definir valores padrão para execução local.
 * - Permitir sobrescrita via variáveis de ambiente (process.env).
 * - Evitar hardcode de configurações diretamente nos clients ou specs.
 *
 * Estratégia:
 * - BASE_URL pode ser definida via variável de ambiente.
 * - TIMEOUT pode ser configurado externamente.
 * - Caso não existam variáveis definidas, valores padrão são utilizados.
 *
 * Benefícios:
 * - Facilita execução em múltiplos ambientes (local, CI, staging, etc.).
 * - Permite alterar URL da API sem modificar código.
 * - Centraliza configuração para melhor manutenção.
 *
 * Exemplo de uso via terminal:
 * BASE_URL=https://api.teste.com TIMEOUT=5000 npm test
 *
 * Estrutura exportada:
 * {
 *   baseUrl: string,
 *   timeout: number
 * }
 */

module.exports = {
  /**
   * URL base da API sob teste.
   * Pode ser sobrescrita via variável de ambiente BASE_URL.
   *
   * @type {string}
   */
  baseUrl: process.env.BASE_URL || 'https://serverest.dev',

  /**
   * Timeout padrão (em milissegundos) para requisições HTTP.
   * Pode ser sobrescrito via variável de ambiente TIMEOUT.
   *
   * @type {number}
   */
  timeout: Number(process.env.TIMEOUT || 10000),
};