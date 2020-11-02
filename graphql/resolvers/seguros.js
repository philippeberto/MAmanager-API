const db = require('../../firestore/index')

const findAllSeguros = async (parent, { user }) => {
  const segurosDB = await db.collection(user).doc('Data').collection('Seguros').get()
  if (segurosDB.empty) {
    return []
  } else {
    const seguros = []
    segurosDB.forEach((doc) => {
      seguros.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    return seguros
  }
}

const createSeguro = async (parent, { user, input }) => {
  console.log(input)
  const doc = db.collection(user).doc('Data').collection('Seguros').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

module.exports = {
  findAllSeguros,
  createSeguro,
}
