import api from 'utils/api'

const getInbox = async ({ commit }, id) => {
  const result = await api.get(`Inbox/${id}`)
  commit('SET_INBOX', { result })
}

const getInboxItem = async ({ commit }, o) => {
  const result = await api.get(`Inbox/${o.executante}/${o.inicio}/${o.tag}`)
  commit('SET_INBOX_ITEM', { result })
}

export {
  getInbox,
  getInboxItem
}
