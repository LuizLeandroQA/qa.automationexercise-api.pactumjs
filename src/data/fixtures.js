// src/data/fixtures.js

/**
 * @file fixtures.js
 * @description
 * Arquivo responsável por centralizar massas de dados estáticas
 * utilizadas nos testes automatizados de API.
 *
 * Objetivo:
 * - Padronizar dados base reutilizáveis.
 * - Evitar duplicação de payloads nos specs.
 * - Facilitar manutenção e alteração de dados fixos.
 *
 * Observação:
 * - Dados dinâmicos (como email único) devem continuar sendo gerados via factory.
 * - Este arquivo contém apenas dados estáticos de apoio.
 */

/**
 * Payload base para criação de usuário.
 * Pode ser usado como modelo e sobrescrito dinamicamente.
 */
const usuarioBase = {
  nome: 'Usuário QA',
  email: 'qa@test.com',
  password: '123456',
  administrador: 'true',
};

/**
 * Payload base para login.
 */
const loginBase = {
  email: 'qa@test.com',
  password: '123456',
};

/**
 * Payload base para criação de produto.
 */
const produtoBase = {
  nome: 'Produto QA',
  preco: 10,
  descricao: 'Produto criado via teste automatizado',
  quantidade: 1,
};

module.exports = {
  usuarioBase,
  loginBase,
  produtoBase,
};