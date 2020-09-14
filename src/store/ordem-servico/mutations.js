
const SET_STATE = (store, data) => {
  let module = store.state
  let state = data.state === undefined ? data.vm._props.state : data.state
  module[state] = module[state] || data.vm.$set(module, state, {})
  state === !data.state ? data.vm.$set(module, [data.key], data.value) : data.vm.$set(module[state], [data.key], data.value)
}

const SET_ORDEM_SERVICO = (state, obj) => {
  state.OrdemServico = obj.result
}

const SET_ORDENS_SERVICOS_PAGE = (state, obj) => {
  state.OrdensServicosPage = obj.result
}

const SET_ORDEM_SERVICO_EDIT = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.data)))
  state.state = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.data)))
}

const SET_TAG_OS = (state, obj) => {
  state.OrdemServicoEdit.data.ordem_servico.os_tag = obj
}

const SET_PROP_ORDEM_SERVICO = (state, obj) => {
  state.OrdemServicoEdit.data = state.OrdemServicoEdit.data || obj.vm.$set(state.OrdemServicoEdit, 'data', { ordem_servico: {} })
  obj.vm.$set(state.OrdemServicoEdit.data.ordem_servico, obj.prop, obj.valor)
}

const INCLUDE_IN_ORDEM_SERVICO_STATE = (state, data) => {
  let indice = state.state[data.name].indexOf(data.data)
  let remove = indice !== -1 ? 1 : 0
  state.state[name].splice(indice, remove, data.data)
  // indice !== -1 ? indice : indice = state.state[data.name].length
  // if (indice !== -1) {
  //   state.state[name].splice(indice, 1, data.data)
  //   return
  // }
  // state.state[name].splice(indice, 0, data.data)
}

// const SET_PROP_ORDEM_SERVICO_POST = (state, obj) => {
//   state.PostOrdemServicoEdit[obj.prop] = obj.valor
// }

// const CLEAR_OBJETO_ORDEM_SERVICO_EDIT = (state) => {
//   state.OrdemServicoEdit = {}
// }

const CRIA_ORDEM_SERVICO_EDIT = (state, prop) => {
  state.OrdemServicoEdit.data = state.OrdemServicoEdit.data || { [prop]: {} }
}

const REMOVE_ELEMENT_STATE = (state, obj) => {
  state.state[obj.state].splice(obj.index, obj.quantidade = 1)
}

const CLEAR_STATE_ROOT = (state) => {
  state['original'] = {}
  state['state'] = {}
}

export {
  SET_ORDENS_SERVICOS_PAGE,
  SET_ORDEM_SERVICO_EDIT,
  SET_TAG_OS,
  SET_PROP_ORDEM_SERVICO,
  // SET_PROP_ORDEM_SERVICO_POST,
  INCLUDE_IN_ORDEM_SERVICO_STATE,
  SET_ORDEM_SERVICO,
  SET_STATE,
  // CLEAR_OBJETO_ORDEM_SERVICO_EDIT,
  CLEAR_STATE_ROOT,
  CRIA_ORDEM_SERVICO_EDIT,
  REMOVE_ELEMENT_STATE
}
