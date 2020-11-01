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

module.exports = {
  findAllCompras,
  createCompra,
}
