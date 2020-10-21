const db = require('../../firestore/index')
const { doc } = require('../../firestore/index')


const findAllAlunos = async (parent, { filter }, context) => {
  const alunosDB = await db.collection('Alunos').get()
  if (alunosDB.empty) {
    return []
  } else {
    const alunos = []
    alunosDB.forEach(doc => {
      alunos.push({
        ...doc.data(),
        id: doc.id
      })
    })
    return alunos
  }
}

const findAluno = async (context, { id }) => {
  const doc = await db.collection('Alunos').doc(id).get()
  const aluno = { id, ...doc.data() }
  return aluno
}

const createAluno = async (context, { input }) => {
  const doc = db.collection('Alunos').doc()
  await doc.set(input)
  const id = doc.id
  return { id, ...input }
}

const removeAluno = async (context, { id }) => {
  const doc = db.collection('Alunos').doc(id)
  await doc.delete()
  return true
}

const updateAluno = async (context, { id, input }) => {
  const doc = db.collection('Alunos').doc(id)
  await doc.update(input)
  const newDoc = await doc.get()
  return { id, ...newDoc.data() }
}

module.exports = {
  findAllAlunos,
  findAluno,
  createAluno,
  removeAluno,
  updateAluno
}