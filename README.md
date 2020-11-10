# Sistema de Gestão Básica de uma academia de Jiu-Jitsu

Este repositório é o código fonte da API de um sistema básico feito para a academia Gracie Barra Campolide que pode ser acessado em https://mamanager.vercel.app/.

## Início

Estas instruções te darão uma cópia do projeto e permitirão executar na sua máquina local para fins de desenvolvimento e testes.

### Pré-requisitos

Você precisa do NodeJS e do NPM instalado em sua máquina.

```
npm install
node index
```

### Variáveis de Ambiente

É necessário fornecer os dados de uma aplicação do Cloud Firestore (pode ser gratuita) no arquivo .env.

## Construído com:

- [Express](https://expressjs.com/) - Node.js Web Application Framework;
- [Apollo Server](https://www.apollographql.com/) - The Industry-Standard GraphQL Implementation;
- [Cloud Firestore](https://firebase.google.com/products/firestore/) - Google Cloud NoSQL Database;
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken/) - An implementation of JSON Web Tokens;
- [heroku](https://www.heroku.com/) - Cloud Application Platform;

## Autor

**Philippe Berto:** [LinkedIn](https://www.linkedin.com/in/philippeberto/) | [Resume](https://resume.philippeberto.vercel.app/)

## Funcionalidades do Sistema

### Requisitos Funcionais

- Operaçoes de CRUD para Alunos
- Operaçoes de CRUD para Mensalidades
- Operaçoes de CRUD para Vendas
- Operaçoes de CRUD para Compras
- Operaçoes de CRUD para Despesas

##### Obs.: Atualmente está implementada a operação de Update apenas para Alunos e as operações de Delete estão a ser

Painel inicial com as seguintes informações:

- Total de mensalidades por período (Mês atual)
- Total de vendas por período (Mês atual)
- Total de despesas por período (Mês atual)
- Total de compras por período (Mês atual)
- Resumo do saldo: Mensalidades + Vendas - Compras - Despesas = Saldo

# Front-End

O projeto front-end desta aplicação pode ser encontrado no repositório https://github.com/philippeberto/MAmanager. Foram utilizados o Next, Auth0, Formik, Day.js e o Yup.
