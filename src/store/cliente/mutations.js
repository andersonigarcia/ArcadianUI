const SET_CLIENTE_PAGE = (state, obj) => {
  state.ClientePage = obj
}

const SET_STATE = (store, data) => {
  let module = store.state
  let state = data.state === undefined ? data.vm._props.state : data.state
  module[state] = module[state] || data.vm.$set(module, state, {})
  state === data.key ? data.vm.$set(module, [data.key], data.value) : data.vm.$set(module[state], [data.key], data.value)
}

const SET_CLIENTE_EDIT = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.clientes)))
  state.state = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.clientes)))
}

const SET_PROFISSIONAL_EDIT = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.profissional)))
  state.state = JSON.parse(JSON.stringify(state.state = Object.assign(state.state, state.state, data.result.profissional)))
}

const SET_ENDERECO = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.enderecos)))
  state.state = JSON.parse(JSON.stringify(Object.assign(state.state, state.state, data.result.enderecos)))
}

const SET_STATE_COMPONENT = (state, obj) => {
  state.state[obj.state] = Object.assign(state.state[obj.state], obj.data)
}

const DELETE_STATE = (state, obj) => {
  if (state.state[obj.state] !== undefined) {
    if (!obj.state) delete state.state // apaga tronco
    else { obj.son ? delete state.state[obj.state][obj.son] : delete state.state[obj.state] } // apaga galho
  }
}

const PUSH_STATE_COMPONENT = (state, obj) => {
  state.state[obj.state] = state.state[obj.state] || []
  state.state[obj.state].splice(state.state[obj.state].length, 0, obj.data)
}

const REMOVE_ELEMENT_STATE = (state, obj) => {
  state.state[obj.state].splice(obj.index, obj.quantidade = 1)
}

const CLEAR_STATE_ROOT = (state) => {
  state['original'] = {}
  state['state'] = {}
}

export {
  SET_CLIENTE_PAGE,
  SET_CLIENTE_EDIT,
  SET_STATE_COMPONENT,
  DELETE_STATE,
  CLEAR_STATE_ROOT,
  PUSH_STATE_COMPONENT,
  REMOVE_ELEMENT_STATE,
  SET_PROFISSIONAL_EDIT,
  SET_ENDERECO,
  SET_STATE
}
