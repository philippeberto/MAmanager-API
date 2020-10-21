const db = require('../firestore')

const findAll = async () => {
  const alunosDB = await db.collection('Alunos').get()
  if (alunosDB.empty) {
    return []
  } else {
    const alunos = []
    alunosDB.forEach(doc => {
      alunos.push({
        ...doc.data,
        id: doc.id
      })
    })
    return alunos
  }
}

const findAluno = async (id) => {
  const doc = await db.collection('Alunos').doc(id).get()
  return doc._fieldsProto
}

const remove = async (id) => {
  const doc = db.collection('Alunos').doc(id)
  await doc.delete()
}

const create = async (data) => {
  const doc = db.collection('Alunos').doc()
  await doc.set(data)
}

const update = async (id, data) => {
  const doc = db.collection('Alunos').doc(id)
  await doc.update(data)
}

module.exports = {
  findAll,
  findAluno,
  remove,
  create,
  update
}