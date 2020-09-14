import api from 'utils/api'
import _ from 'lodash'

const getClientesFind = async ({ commit }, text) => {
  return api.get(`Clientes/Find?q=${text}`)
}

const getClientes = async ({ commit }, filter) => {
  return api.get(`Clientes?${filter}`)
}

const getClienteEdit = async ({ commit }, tag) => {
  const result = await api.get(`CLientes/Edit/${tag}`)
  await commit('SET_CLIENTE_EDIT', { result })
  return result
}

const getProfissionalEdit = async ({ commit }, tag) => {
  const result = await api.get(`Profissionais/${tag}`)
  await commit('SET_PROFISSIONAL_EDIT', { result })
  return result
}

const getEnderecosPessoa = async ({ commit }, tag) => {
  const result = await api.get(`Enderecos/Pessoa/${tag}`)
  await commit('SET_ENDERECO', { result })
  return result
}

const getEnderecosEmpresa = async ({ commit }, tag) => {
  const result = await api.get(`Enderecos/Empresa/${tag}`)
  await commit('SET_ENDERECO', { result })
  return result
}

const getClientesEmpresas = async ({ commit }) => {
  return api.get('Clientes/Empresas')
}

const getPessoasFind = async ({ commit }, text) => {
  return api.get(`Pessoas/Find?q=${text}`)
}

const getEmpresaFind = async ({ commit }, text) => {
  return api.get(`Empresas/Find?q=${text}`)
}

const getEnderecoCep = async ({ commit }, cep) => {
  let result = await api.get(`https://viacep.com.br/ws/${cep || '00000000'}/json/`)
  if (result.erro) { return result }
  return _.omit(result, ['unidade', 'ibge', 'guia'])
}

const putClientesProfissional = async ({ commit }, profissional) => {
  return api.put(`Clientes/Profissional`, profissional.obj, {}, profissional.itemNotify)
}

const postClientesProfissional = ({ commit }, profissional) => {
  return api.post(`Clientes/Profissional`, profissional.obj, {}, profissional.itemNotify)
}

const putClientesEmpresa = async ({ commit }, empresa) => {
  return api.put(`Clientes/Empresa`, empresa.obj, {}, empresa.itemNotify)
}

const postClientesEmpresa = ({ commit }, empresa) => {
  return api.post(`Clientes/Empresa`, empresa.obj, {}, empresa.itemNotify)
}

const postClientesProdutos = ({ commit }, produto) => {
  return api.post(`Clientes/Produtos`, produto.obj, {}, produto.itemNotify)
}

const putEnderecos = ({ commit }, endereco) => {
  return api.put('Enderecos', endereco.obj, {}, endereco.itemNotify)
}

const postEnderecos = ({ commit }, endereco) => {
  return api.post('Enderecos', endereco.obj, {}, endereco.itemNotify)
}

const putProfissionais = ({ commit }, profissional) => {
  return api.put(`Profissionais`, profissional.obj, {}, profissional.itemNotify)
}

const postProfissionais = ({ commit }, profissional) => {
  return api.post(`Profissionais`, profissional.obj, {}, profissional.itemNotify)
}

const postProfissionaisVinculos = ({ commit }, vinculo) => {
  return api.post(`Profissionais/Vinculos`, vinculo)
}

const deletCliente = ({ commit }, id) => {
  return api.del(`Clientes/${id}`)
}

const deletProfissional = ({ commit }, id) => {
  return api.del(`Profissionais/${id}`)
}

const setState = ({ commit }, { state, key, value, vm }) => {
  commit('SET_STATE', { state, key, value, vm })
}

const pushState = async ({ commit }, obj) => {
  await commit('PUSH_STATE_COMPONENT', obj)
}

const removeElementState = async ({ commit }, obj) => {
  await commit('REMOVE_ELEMENT_STATE', obj)
}

export {
  getClientes,
  getClienteEdit,
  getClientesFind,
  getClientesEmpresas,
  getPessoasFind,
  getEnderecoCep,
  setState,
  pushState,
  removeElementState,
  putClientesProfissional,
  postClientesProfissional,
  putClientesEmpresa,
  postClientesEmpresa,
  postClientesProdutos,
  putEnderecos,
  postEnderecos,
  putProfissionais,
  postProfissionais,
  postProfissionaisVinculos,
  deletProfissional,
  getProfissionalEdit,
  getEnderecosPessoa,
  getEnderecosEmpresa,
  getEmpresaFind,
  deletCliente
}
