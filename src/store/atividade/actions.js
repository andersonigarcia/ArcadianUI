import api from 'utils/api'

const getAtividades = async ({ commit }) => {
  return api.get(`Atividades`)
}

export {
  getAtividades

}
