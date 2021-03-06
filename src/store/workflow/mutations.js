const SET_STATE = (store, data) => {
  let module = store.state
  let state = data.state === undefined ? data.vm._props.state : data.state
  module[state] = module[state] || data.vm.$set(module, state, {})
  state === data.key ? data.vm.$set(module, [data.key], data.value) : data.vm.$set(module[state], [data.key], data.value)
}

const SET_WORKFLOW_EDIT = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.workflow)))
  state.state = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.workflow)))
}

const SET_STATE_ORIGINAL = (state, data) => {
  state.success = data.result.success
  state.original = JSON.parse(JSON.stringify(Object.assign(state.original, state.original, data.result.workflow)))
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
  SET_STATE,
  SET_WORKFLOW_EDIT,
  PUSH_STATE_COMPONENT,
  REMOVE_ELEMENT_STATE,
  SET_STATE_ORIGINAL,
  CLEAR_STATE_ROOT
}
