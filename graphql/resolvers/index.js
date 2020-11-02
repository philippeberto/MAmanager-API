const { AuthenticationError } = require('apollo-server-express')

const {
  findAllAlunos,
  findAluno,
  createAluno,
  removeAluno,
  updateAluno,
} = require('./alunos')
const { findAllMensalidades, createMensalidade } = require('./mensalidades')
const { findAllDespesas, createDespesa } = require('./despesas')
const { findAllVendas, createVenda } = require('./vendas')
const { findAllCompras, createCompra } = require('./compras')
const { findAllSeguros, createSeguro } = require('./seguros')

const needsAuth = (resolver) => {
  return async (parent, args, context) => {
    if (!context.client) {
      throw new AuthenticationError('needs authentication')
    }
    return resolver(parent, args, context)
  }
}

const resolvers = {
  Query: {
    findAllAlunos: needsAuth(findAllAlunos),
    findAluno: needsAuth(findAluno),
    findAllMensalidades: needsAuth(findAllMensalidades),
    findAllDespesas: needsAuth(findAllDespesas),
    findAllVendas: needsAuth(findAllVendas),
    findAllCompras: needsAuth(findAllCompras),
    findAllSeguros: needsAuth(findAllSeguros),
  },
  Mutation: {
    createAluno: needsAuth(createAluno),
    removeAluno: needsAuth(removeAluno),
    updateAluno: needsAuth(updateAluno),
    createMensalidade: needsAuth(createMensalidade),
    createDespesa: needsAuth(createDespesa),
    createVenda: needsAuth(createVenda),
    createCompra: needsAuth(createCompra),
    createSeguro: needsAuth(createSeguro),
  },
}

module.exports = resolvers
