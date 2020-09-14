import api from 'utils/api'

const getColaboradores = async ({ commit }) => {
  return api.get(`Colaboradores`)
}

const getColaboradoresId = async ({ commit }, tag) => {
  const result = await api.get(`Colaboradores/${tag}`)
  await commit('SET_COLABORADOR_EDIT', { result })
  return result
}

const getStateOriginal = async ({ commit }, tag) => {
  const result = await api.get(`Colaboradores/${tag}`)
  await commit('SET_STATE_ORIGINAL', { result })
  return result
}

const putColaboradores = async ({ commit }, colaborador) => {
  return api.put(`Colaboradores`, colaborador.obj, {}, colaborador.itemNotify)
}

const postColaboradores = ({ commit }, colaborador) => {
  return api.post(`Colaboradores`, colaborador.obj, {}, colaborador.itemNotify)
}

const postColaboradoresCompetencia = ({ commit }, competencias) => {
  return api.post(`Colaboradores/Competencias`, competencias.obj, {}, competencias.itemNotify)
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

const deletColaborador = ({ commit }, id) => {
  return api.del(`Colaboradores/${id}`)
}

export {
  getColaboradores,
  getColaboradoresId,
  getStateOriginal,
  putColaboradores,
  postColaboradores,
  postColaboradoresCompetencia,
  deletColaborador,
  setState,
  pushState,
  removeElementState

}
