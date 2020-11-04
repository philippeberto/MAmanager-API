const { AuthenticationError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const {
  findAllAlunos,
  findAluno,
  createAluno,
  removeAluno,
  updateAluno,
} = require('./alunos')
const { findAllMensalidades, createMensalidade } = require('./mensalidades')
const { findAllDespesas, createDespesa, findAllDespesasByDate } = require('./despesas')
const { findAllVendas, createVenda } = require('./vendas')
const { findAllCompras, createCompra } = require('./compras')
const { findAllSeguros, createSeguro } = require('./seguros');
const moment = require('moment');

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
    findAllDespesasByDate: needsAuth(findAllDespesasByDate),
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
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return moment(value); // value from the client
    },
    serialize(value) {
      console.log(value)
      return moment(value).format("DD/MM/YYYY"); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return moment(+ast.value) // ast value is always in string format
      }
      return null;
    },
  })
}

module.exports = resolvers
