const db = require('../../firestore/index')
const { firestore } = require('firebase-admin')

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

const somaMensalidadesByPeriod = async (parent, { user, input }) => {
  let total = 0
  const mensalidadesDB = await db.collection(user).doc('Data').collection('Mensalidades')
    .where('paymentDate', '>=', input.idate)
    .where('paymentDate', '<=', input.fdate)
    .get()
  if (mensalidadesDB.empty) {
    return total
  } else {
    mensalidadesDB.forEach(doc => {
      total += parseInt(doc._fieldsProto.price.integerValue)
    })
    return total
  }
}

module.exports = {
  findAllMensalidades,
  somaMensalidadesByPeriod,
  createMensalidade
}