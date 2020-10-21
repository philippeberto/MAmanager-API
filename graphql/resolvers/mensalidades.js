const db = require('../../firestore/index')
const { context } = require('..')

const findAllMensalidades = async () => {
  const mensalidadesDB = await db.collection('mensalidades').get()
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

const createMensalidade = async (parent, { input }, context) => {
  const doc = db.collection('mensalidades').doc()
  await doc.set(input)
  const id = doc.id
  return true
}

module.exports = {
  findAllMensalidades,
  createMensalidade
}