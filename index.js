const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const graphqlServer = require('./graphql')


graphqlServer.applyMiddleware({ app })

app.listen(PORT, (err) => {
  if (err) {
    console.log('Not possible to listen on port 3001')
  } else {
    console.log('listening on port', PORT)
  }
})