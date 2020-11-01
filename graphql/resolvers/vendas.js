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
  console.log(input)
  const doc = db.collection(user).doc('Data').collection('Vendas').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

module.exports = {
  findAllVendas,
  createVenda,
}
