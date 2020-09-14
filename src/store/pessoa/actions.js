import api from 'utils/api'

const getPessoasFind = async ({ commit }, text) => {
  return api.get(`Pessoas/Find?q=${text}`)
}

export {
  getPessoasFind
}
