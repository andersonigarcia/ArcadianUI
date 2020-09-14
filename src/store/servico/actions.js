import api from 'utils/api'

const getServicosProdutos = async ({ commit }) => {
  return api.get(`Servicos/Produtos`)
}

const getServicosId = async ({ commit }, id) => {
  const result = await api.get(`Servicos/Edit/${id}`)
  await commit('SET_SERVICO_EDIT', { result })
  return result
}

const putServicos = async ({ commit }, produto) => {
  return api.put(`Servicos`, produto.obj, {}, produto.itemNotify)
}

const postServicos = ({ commit }, produto) => {
  return api.post(`Servicos`, produto.obj, {}, produto.itemNotify)
}

const setState = ({ commit }, { state, key, value, vm }) => {
  commit('SET_STATE', { state, key, value, vm })
}

const addOrUpdateObjectState = async ({ commit }, { name, index, remove, item, vm }) => {
  await commit('ADD_OR_UPDATE_ELEMENT_STATE', { name, item, vm })
}

const removeElementState = async ({ commit }, obj) => {
  await commit('REMOVE_ELEMENT_STATE', obj)
}

const setEmptyElementState = async ({ commit }, obj) => {
  await commit('SET_EMPTY_ELEMENT_STATE', obj)
}

const deletServico = ({ commit }, id) => {
  return api.del(`Servicos/${id}`)
}

export {
  getServicosProdutos,
  getServicosId,
  setState,
  putServicos,
  postServicos,
  deletServico,
  removeElementState,
  setEmptyElementState,
  addOrUpdateObjectState
}
