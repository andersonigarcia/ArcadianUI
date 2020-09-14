const SET_STATE = (store, data) => {
  let module = store.state
  let state = data.state === undefined ? data.vm._props.state : data.state
  module[state] = module[state] || data.vm.$set(module, state, {})
  state === data.key ? data.vm.$set(module, [data.key], data.value) : data.vm.$set(module[state], [data.key], data.value)
}

const CLEAR_STATE_ROOT = (state) => {
  state['original'] = {}
  state['state'] = {}
}

export {
  SET_STATE,
  CLEAR_STATE_ROOT
}
