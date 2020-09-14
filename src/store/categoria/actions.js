import api from 'utils/api'

const getCategorias = async ({ commit }) => {
  return api.get(`Categorias`)
}

const getCategoriasId = async ({ commit, id }) => {
  return api.get(`Categorias/${id}`)
}

const putCategoria = async ({ commit }, obj) => {
  return api.put(`Categorias`, obj)
}

const postCategoria = ({ commit }, obj) => {
  return api.post(`Categorias`, obj)
}

const deletCategoria = ({ commit }, id) => {
  return api.del(`Categorias/${id}`)
}

export {
  getCategorias,
  getCategoriasId,
  putCategoria,
  postCategoria,
  deletCategoria
}
