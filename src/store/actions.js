import http from 'axios'
import to from 'await-to-js'
var path = 'http://localhost:8080/api/';

function checkError(error) {
  if (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data)
      console.log(error.response.status)
      // console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
  }
}

export const Servicos = async (context, index) => {
  const [ error, response = { data: null } ] = await to(http.get(path + `Servicos/page/${index}`))
  checkError(error)
  return response.data
}

export const OrdensServicos = async (context, index) => {
  //const [ error, response = { data: null } ] = await to(http.get('api/ServicosOs'))
  const [error, response = { data: null }] = await to(http.get(path + 'OrdensServicos/Edit/19B5'))
  // const [error, response = {
  //   data: null
  // }] = await to(http.get('../Matriz_Dados/OrdemServico.json'))
  //const [ error, response = { data: null } ] = await to(http.get(path+`Servicos/page/${index}`))
  checkError(error)
  return response.data
}

export const searchServicos = async (context, text) => {
  const [error, response = {
    data: null
  }] = await to(http.post(path + 'Servicos', {
    q: text
  }))
  checkError(error)
  return response.data
}

export const listAtividades = async (context) => {
  const [error, response = {
    data: []
  }] = await to(http.get('../Matriz_Dados/atividades.json'))
  // const [error, response = {
  //   data: null
  // }] = await to(http.get(path + 'Atividades'))
  checkError(error)
  return response.data
}

export const searchAtividades = async (context, text) => {
  const [error, response = {
    data: null
  }] = await to(http.post(path + 'Atividades', {
    q: text
  }))
  checkError(error)
  return response.data
}

export const getServicoByTag = async (context, tag) => {
  const [error, response = {
    data: null
  }] = await to(http.get(path + `Servico/${tag}`))
  checkError(error)
  return response.data
}

export const getAtividadeById = async (context, id) => {
  const [error, response = {
    data: null
  }] = await to(http.get(path + `Atividade/${id}`))
  checkError(error)
  return response.data
}

export const searchClienteByName = async (context, text) => {
  const [error, response = {
    data: []
  }] = await to(http.post(path + 'Clientes', {
    q: text
  }))
  checkError(error)
  return response.data
}

export const searchPacienteByName = async (context, text) => {
  const [error, response = {
    data: []
  }] = await to(http.post(path + 'Pacientes', {
    q: text
  }))
  checkError(error)
  return response.data
}

export const searchProdutoByName = async (context, text) => {
  //const [ error, response = { data: [] } ] = await to(http.post('api/Produtos', { q: text }))
  const [error, response = {
    data: []
  }] = await to(http.post('../../json_dados/produto/xprodutos.json', {
    q: text
  }))
  checkError(error)
  return response.data
}
