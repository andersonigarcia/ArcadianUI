import api from 'utils/api'

const getColaboradores = async ({ commit }, id) => {
  return api.get(`Competencias/${id}/Colaboradores`)
}

export {
  getColaboradores
}
