const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT
const graphqlServer = require('./graphql')


graphqlServer.applyMiddleware({ app })

const fromBase64 = value => {
  const buff = new Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

app.listen(PORT, (err) => {
  if (err) {
    console.log('Not possible to listen on port 3001')
  } else {
    console.log('listening on port', PORT)
  }
})