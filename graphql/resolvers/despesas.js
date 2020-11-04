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

const findAllDespesasByDate = async (parent, { user, dates }) => {
  try {
    const despesasDB = db.collection(user).doc('Data').collection('Despesas')
      .where('date', '>=', dates.idate)
      .where('date', '<=', dates.fdate)
      .get();
    if (despesasDB.empty) {
      console.log('No matching documents.');
      return [];
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
  } catch (err) {
    console.log('Error getting documents', err);
    return []
  }
}

const createDespesa = async (parent, { user, input }) => {
  console.log(input)
  const doc = db.collection(user).doc('Data').collection('Despesas').doc()
  await doc.set(input)
  // await doc.set({ createdAt: new Date() })
  const id = doc.id
  return { id, ...input }
}

module.exports = {
  findAllDespesas,
  createDespesa,
  findAllDespesasByDate
}
