const alunos = require('./Alunos/Alunos')

const testes = async () => {
  const res = await alunos.findAluno('h68iGbbwbMvXThI6P8OA')
  console.log(res)
}

testes()
