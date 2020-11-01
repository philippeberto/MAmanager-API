const db = require('../../firestore/index')

const findAllDespesas = async (parent, { user }) => {
  const despesasDB = await db.collection(user).doc('Data').collection('Despesas').get()
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

const createDespesa = async (parent, { user, input }) => {
  console.log(input)
  const doc = db.collection(user).doc('Data').collection('Despesas').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

module.exports = {
  findAllDespesas,
  createDespesa,
}
