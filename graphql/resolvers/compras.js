const db = require('../../firestore/index')

const findAllCompras = async (parent, { user }) => {
  const comprasDB = await db.collection(user).doc('Data').collection('Compras').get()
  if (comprasDB.empty) {
    return []
  } else {
    const compras = []
    comprasDB.forEach((doc) => {
      compras.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    return compras
  }
}

const createCompra = async (parent, { user, input }) => {
  console.log(input)
  const doc = db.collection(user).doc('Data').collection('Compras').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

const somaComprasByPeriod = async (parent, { user, input }) => {
  let total = 0
  const mensalidadesDB = await db.collection(user).doc('Data').collection('Compras')
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
  findAllCompras,
  createCompra,
  somaComprasByPeriod
}
