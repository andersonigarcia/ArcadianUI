
const getTodosClientesByName = state => (startRow, filter) => {
  if (filter) {
    return state.ClientePage.filter(e => e.cliente_nome.toUpperCase().includes(filter.toUpperCase()))
  }
  return state.ClientePage
}

export {
  getTodosClientesByName
}
