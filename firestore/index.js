const admin = require('firebase-admin')

const serviceAccount = require('../firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gym-bd.firebaseio.com'
})

const db = admin.firestore()

module.exports = db