
const setPropUsuarioSessao = ({ commit }, { prop, valor }) => {
  commit('SET_PROP_USUARIO_SESSAO', { prop, valor })
}

export {
  setPropUsuarioSessao
}
