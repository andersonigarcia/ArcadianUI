import api from 'utils/api'

const getWorkflows = async ({ commit }) => {
  return api.get(`Workflow`)
}

const getWorkflowId = async ({ commit }, id) => {
  const result = await api.get(`Workflow/${id}`)
  await commit('SET_WORKFLOW_EDIT', { result })
  return result
}

const getStateOriginal = async ({ commit }, id) => {
  const result = await api.get(`Workflow/${id}`)
  await commit('SET_STATE_ORIGINAL', { result })
  return result
}

const putWorkflow = async ({ commit }, workflow) => {
  return api.put(`Workflow`, workflow.obj, {}, workflow.itemNotify)
}

const postWorkflow = ({ commit }, workflow) => {
  return api.post(`Workflow`, workflow.obj, {}, workflow.itemNotify)
}

const postWorkflowAtividades = ({ commit }, atividades) => {
  return api.post(`Workflow/Atividades`, atividades.obj, {}, atividades.itemNotify)
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

const deletWorkflow = ({ commit }, id) => {
  return api.del(`Workflow/${id}`)
}

export {
  getWorkflows,
  getWorkflowId,
  putWorkflow,
  postWorkflow,
  postWorkflowAtividades,
  setState,
  deletWorkflow,
  getStateOriginal,
  pushState,
  removeElementState
}
