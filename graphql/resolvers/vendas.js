const db = require('../../firestore/index')

const findAllVendas = async () => {
  const vendasDB = await db.collection('vendas').get()
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

const createVenda = async (parent, { input }) => {
  console.log(input)
  const doc = db.collection('vendas').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

module.exports = {
  findAllVendas,
  createVenda,
}
