const db = require('../../firestore/index')

const findAllVendas = async (parent, { user }) => {
  const vendasDB = await db.collection(user).doc('Data').collection('Vendas').get()
  if (vendasDB.empty) {
    return []
  } else {
    const vendas = []
    vendasDB.forEach((doc) => {
      vendas.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    return vendas
  }
}

const createVenda = async (parent, { user, input }) => {
  const doc = db.collection(user).doc('Data').collection('Vendas').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

const somaVendasByPeriod = async (parent, { user, input }) => {
  let total = 0
  const mensalidadesDB = await db.collection(user).doc('Data').collection('Vendas')
    .where('date', '>=', input.idate)
    .where('date', '<=', input.fdate)
    .get()
  if (mensalidadesDB.empty) {
    return total
  } else {

    mensalidadesDB.forEach(doc => {
      if (doc._fieldsProto.price.integerValue) {
        total += parseFloat(doc._fieldsProto.price.integerValue)
      }
      if (doc._fieldsProto.price.doubleValue) {
        total += parseFloat(doc._fieldsProto.price.doubleValue)
      }
    })
    return total
  }
}

module.exports = {
  findAllVendas,
  createVenda,
  somaVendasByPeriod
}
