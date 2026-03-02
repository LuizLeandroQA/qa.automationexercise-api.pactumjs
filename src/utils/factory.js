// src/utils/factory.js

/**
 * Factory de Massa de Dados
 *
 * Objetivo:
 * Centralizar a geração de dados dinâmicos para os testes automatizados,
 * garantindo isolamento entre execuções e evitando conflitos de duplicidade
 * (ex: email já cadastrado).
 *
 * Estratégia:
 * - Utilização de Date.now() para gerar valores únicos por execução.
 * - Uso de número aleatório complementar no email.
 * - Retorno de objetos prontos para consumo nos testes (Arrange).
 *
 * Benefícios:
 * - Testes idempotentes
 * - Redução de dependência de dados fixos
 * - Maior confiabilidade em ambientes compartilhados
 */

/**
 * Gera um email único para evitar conflito de duplicidade.
 *
 * Estrutura:
 * qa_{timestamp}_{random}@test.com
 *
 * @returns {string} Email único para uso em cadastro de usuário
 */
function uniqueEmail() {
  return `qa_${Date.now()}_${Math.floor(Math.random() * 1000)}@test.com`;
}

/**
 * Gera um payload válido para criação de usuário.
 *
 * Campos:
 * - nome (dinâmico)
 * - email (único via uniqueEmail)
 * - password (fixa para simplificação do teste)
 * - administrador ('true' conforme contrato da API Serverest)
 *
 * @returns {Object} Objeto pronto para POST /usuarios
 */
function novoUsuario() {
  return {
    nome: `Usuário QA ${Date.now()}`,
    email: uniqueEmail(),
    password: '123456',
    administrador: 'true'
  };
}

/**
 * Gera um payload válido para criação de produto.
 *
 * Campos:
 * - nome (dinâmico)
 * - preco (valor fixo para simplificação do cenário)
 * - descricao (informação estática para clareza)
 * - quantidade (estoque inicial)
 *
 * @returns {Object} Objeto pronto para POST /produtos
 */
function novoProduto() {
  return {
    nome: `Produto QA ${Date.now()}`,
    preco: 10,
    descricao: 'Produto criado via teste automatizado',
    quantidade: 1
  };
}

module.exports = { novoUsuario, novoProduto };