
const SET_PROP_USUARIO_SESSAO = (state, obj) => {
  state.UsuarioSessao[obj.prop] = obj.valor
}

export {
  SET_PROP_USUARIO_SESSAO
}
