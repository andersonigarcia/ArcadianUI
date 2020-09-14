
const SET_INBOX = (state, obj) => {
  state.InboxState = obj.result
}

const SET_INBOX_ITEM = (state, obj) => {
  state.InboxItemState = obj.result
}

export {
  SET_INBOX,
  SET_INBOX_ITEM
}
