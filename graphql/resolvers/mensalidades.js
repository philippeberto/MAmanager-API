const db = require('../../firestore/index')
const { context } = require('..')

const findAllMensalidades = async (parent, { user }) => {
  const mensalidadesDB = await db.collection(user).doc('Data').collection('Mensalidades').get()
  if (mensalidadesDB.empty) {
    return []
  } else {
    const mensalidades = []
    mensalidadesDB.forEach(doc => {
      mensalidades.push({
        ...doc.data(),
        id: doc.id
      })
    })
    return mensalidades
  }
}

const createMensalidade = async (parent, { user, input }, context) => {
  const doc = db.collection(user).doc('Data').collection('Mensalidades').doc()
  await doc.set(input)
  return true
}

module.exports = {
  findAllMensalidades,
  createMensalidade
}