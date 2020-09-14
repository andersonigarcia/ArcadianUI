import api from 'utils/api'

const getProdutos = async ({ commit }) => {
  return api.get(`Produtos`)
}

const getProdutosId = async ({ commit }, id) => {
  const result = await api.get(`Produtos/${id}`)
  await commit('SET_PRODUTO_EDIT', { result })
  return result
}

const getStateOriginal = async ({ commit }, id) => {
  const result = await api.get(`Produtos/${id}`)
  await commit('SET_STATE_ORIGINAL', { result })
  return result
}

const getProdutosPreco = async ({ commit, id }) => {
  return api.get(`Produtos/Precos`)
}

const getProdutosFind = async ({ commit, text }) => {
  return api.get(`Produtos/Find/${text}?q=${text}`)
}

const putProdutos = async ({ commit }, produto) => {
  return api.put(`Produtos`, produto.obj, {}, produto.itemNotify)
}

const postProdutos = ({ commit }, produto) => {
  return api.post(`Produtos`, produto.obj, {}, produto.itemNotify)
}

const postProdutosWorkflow = ({ commit }, workflow) => {
  return api.post(`Produtos/Workflows`, workflow.obj, {}, workflow.itemNotify)
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

const deletProdutos = ({ commit }, id) => {
  return api.del(`Produtos/${id}`)
}

export {
  getProdutos,
  getProdutosId,
  getProdutosPreco,
  getProdutosFind,
  putProdutos,
  postProdutos,
  postProdutosWorkflow,
  getStateOriginal,
  deletProdutos,
  setState,
  pushState,
  removeElementState
}
