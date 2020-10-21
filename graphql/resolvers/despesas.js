const db = require('../../firestore/index')

const findAllDespesas = async () => {
  const despesasDB = await db.collection('despesas').get()
  if (despesasDB.empty) {
    return []
  } else {
    const despesas = []
    despesasDB.forEach((doc) => {
      despesas.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    return despesas
  }
}

const createDespesa = async (parent, { input }) => {
  console.log(input)
  const doc = db.collection('despesas').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

module.exports = {
  findAllDespesas,
  createDespesa,
}
