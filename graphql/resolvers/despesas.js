const db = require('../../firestore/index')
const { firestore } = require('firebase-admin')

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

const findAllDespesasByDate = async (parent, { user, date }) => {
  const d = new Date(date + 'T00:00:00')
  const ftimestamp = firestore.Timestamp.fromDate(d)
  console.log(d)
  console.log(ftimestamp)

  let despesas = db.collection(user).doc('Data').collection('Despesas')
  let query = despesas.where('dueDate', '>=', ftimestamp).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
      const resultado = []
      snapshot.forEach(doc => {
        resultado.push({
          ...doc.data(),
          id: doc.id
        })
      })
      return resultado
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  return query
}

const createDespesa = async (parent, { user, input }) => {
  const doc = db.collection(user).doc('Data').collection('Despesas').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

const somaDespesasByPeriod = async (parent, { user, input }) => {
  let total = 0
  const mensalidadesDB = await db.collection(user).doc('Data').collection('Despesas')
    .where('paymentDate', '>=', input.idate)
    .where('paymentDate', '<=', input.fdate)
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
  findAllDespesas,
  createDespesa,
  findAllDespesasByDate,
  somaDespesasByPeriod
}
