const SET_STATE = (store, data) => {
  let module = store.state
  let state = data.state === undefined ? data.vm._props.state : data.state
  module[state] = module[state] || data.vm.$set(module, state, {})
  state === !data.state ? data.vm.$set(module, [data.key], data.value) : data.vm.$set(module[state], [data.key], data.value)
}

const SET_SERVICO_EDIT = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.data)))
  state.state = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.data)))
}

const SET_STATE_ORIGINAL = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result)))
}

const ADD_OR_UPDATE_ELEMENT_STATE = (store, data) => {
  let indice = store.state[data.name].indexOf(data.item)
  if (indice === -1) {
    store.state[data.name].splice(store.state[data.name].length, 0, data.item)
  } else {
    store.state[data.name].splice(indice, 1, data.item)
  }
}

const REMOVE_ELEMENT_STATE = (state, obj) => {
  state.state[obj.state].splice(obj.index, obj.quantidade = 1)
}

const SET_EMPTY_ELEMENT_STATE = (state, obj) => {
  state.state[obj.name] = obj.value
}

const CLEAR_STATE_ROOT = (state) => {
  state['original'] = {}
  state['state'] = {}
}

export {
  SET_STATE,
  SET_SERVICO_EDIT,
  SET_STATE_ORIGINAL,
  ADD_OR_UPDATE_ELEMENT_STATE,
  REMOVE_ELEMENT_STATE,
  CLEAR_STATE_ROOT,
  SET_EMPTY_ELEMENT_STATE
}
