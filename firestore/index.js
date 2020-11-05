const admin = require('firebase-admin')
const dotenv = require('dotenv');
dotenv.config();

const fromBase64 = value => {
  const buff = new Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIRESTORE_TYPE,
    project_id: process.env.FIRESTORE_PROJECT_ID,
    private_key_id: process.env.FIRESTORE_PRIVATE_KEY_ID,
    private_key: fromBase64(process.env.FIRESTORE_PRIVATE_KEY),
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    client_id: process.env.FIRESTORE_CLIENT_ID,
    auth_uri: process.env.FIRESTORE_AUTH_URI,
    token_uri: process.env.FIRESTORE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIRESTORE_CLIENT_X509_CERT_URL
  }),
  databaseURL: process.env.FIRESTORE_DATABASE_URL
})

const db = admin.firestore()


module.exports = db
