const { AuthenticationError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { firestore } = require('firebase-admin')


const {
  findAllAlunos,
  findAluno,
  createAluno,
  removeAluno,
  updateAluno,
} = require('./alunos')
const { findAllMensalidades, somaMensalidadesByPeriod, createMensalidade } = require('./mensalidades')
const { findAllDespesas, createDespesa, findAllDespesasByDate, somaDespesasByPeriod } = require('./despesas')
const { findAllVendas, createVenda, somaVendasByPeriod } = require('./vendas')
const { findAllCompras, createCompra, somaComprasByPeriod } = require('./compras')
const { findAllSeguros, createSeguro } = require('./seguros');

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
    somaMensalidadesByPeriod: needsAuth(somaMensalidadesByPeriod),
    somaDespesasByPeriod: needsAuth(somaDespesasByPeriod),
    somaVendasByPeriod: needsAuth(somaVendasByPeriod),
    somaComprasByPeriod: needsAuth(somaComprasByPeriod),
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
      const date = new Date(value)
      return firestore.Timestamp.fromDate(date) // value from the client
    },
    serialize(value) {
      return new firestore.Timestamp(value._seconds, value._nanoseconds).toDate(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        date = new Date(ast.value)
        return firestore.Timestamp.fromDate(date) // ast value is always in string format
      }
      return null;
    },
  })
}

module.exports = resolvers
