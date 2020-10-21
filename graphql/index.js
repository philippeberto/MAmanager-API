const { ApolloServer, gql } = require('apollo-server-express')
const fs = require('fs')
const path = require('path')
const schema = fs.readFileSync(path.join(__dirname, './schema.graphql'))
const jwt = require('jsonwebtoken')

const resolvers = require('./resolvers')
const typeDefs = gql`${schema}`

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (req.headers && req.headers.authorization) {
      const header = req.headers.authorization
      const headerParts = header.split(' ')
      const secret = 'hfjroStk$ncbuaFndk469ghn!T6kridu2u&485jyng'
      try {
        const payload = jwt.verify(headerParts[1], secret)
        return { client: payload.client }
      } catch (err) { }
    }
    return {}
  }
})

module.exports = graphqlServer