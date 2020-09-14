import api from 'utils/api'

const getPlanejamento = async ({ commit }, tag) => {
  const nocache = '?' + Date.now()
  const result = await api.get(`Planejamentos/${tag}${nocache}`)
  commit('SET_PLANEJAMENTO', result)
}

const getAtividadeExecucao = async ({ commit }, id) => {
  const result = await api.get(`Planejamentos/Atividades/${id}`)
  commit('SET_ATIVIDADE', result)
}

const getAtividadePlanejamento = async ({ commit }, ids) => {
  const result = await api.get(`Planejamentos/Atividades/${ids.pid}/${ids.aid}`)
  commit('SET_ATIVIDADE', result)
}

const postPlanejamento = async ({ commit }, id) => {
  api.post('Planejamentos', { id })
}

export {
  getPlanejamento,
  getAtividadeExecucao,
  getAtividadePlanejamento,
  postPlanejamento
}
