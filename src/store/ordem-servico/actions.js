import api from 'utils/api'

const getOrdemServico = async ({ commit }, tag) => {
  const result = await api.get(`OrdensServicos/${tag}`)
  commit('SET_ORDEM_SERVICO', { result })
}

const getOrdensServicosPage = async ({ commit }, page) => {
  const nocache = '?' + Date.now()
  const result = await api.get(`OrdensServicos/Page/${page}${nocache}`)
  commit('SET_ORDENS_SERVICOS_PAGE', { result })
}

const getOrdemServicoEdit = async ({ commit }, tag) => {
  const result = await api.get(`OrdensServicos/Edit/${tag}`)
  await commit('SET_ORDEM_SERVICO_EDIT', { result })
  return result
}

const getOrdemServicoMateriais = async ({ commit }) => {
  const result = await api.get(`/OrdensServicos/Materiais`)
  return result
}

const putOrdemServicoEdit = ({ commit }, OrdemServico) => {
  return api.put(`OrdensServicos/Edit`, OrdemServico.obj, {}, OrdemServico.itemNotify)
}

const postOrdemServicoEdit = ({ commit }, OrdemServico) => {
  return api.post(`OrdensServicos/Edit`, OrdemServico.obj, {}, OrdemServico.itemNotify)
}

// const resetObject = ({ commit }, prop) => { commit('CLEAR_OBJETO_ORDEM_SERVICO_EDIT', prop) }

const setOrdemServico = ({ commit }, obj) => {
  commit('SET_ORDEM_SERVICO_EDIT', obj)
}
const setServicoInOrdemServico = ({ commit }, data) => {
  commit('INCLUDE_IN_ORDEM_SERVICO_STATE', { data })
}

const setPropOrdemServico = ({ commit }, { prop, valor, vm }) => {
  commit('SET_PROP_ORDEM_SERVICO', { prop, valor, vm })
}
// this.set(this.state.OrdemServico.OrdemServicoEdit.data.ordem_servico, prop, valor)

const setState = ({ commit }, { state, key, value, vm }) => {
  commit('SET_STATE', { state, key, value, vm })
}

// const setPropOrdemServicoPost = ({ commit }, { prop, valor }) => {
//   commit('SET_PROP_ORDEM_SERVICO_POST', { prop, valor })
// }

const removeElementState = async ({ commit }, obj) => {
  await commit('REMOVE_ELEMENT_STATE', obj)
}

// const criaOrdemServicoEdit = ({ commit }, prop) => { commit('CRIA_ORDEM_SERVICO_EDIT', prop) }

export {
  getOrdensServicosPage,
  getOrdemServicoEdit,
  setOrdemServico,
  setPropOrdemServico,
  setServicoInOrdemServico,
  setState,
  postOrdemServicoEdit,
  putOrdemServicoEdit,
  // resetObject,
  getOrdemServicoMateriais,
  getOrdemServico,
  removeElementState
}
