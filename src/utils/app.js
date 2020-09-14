// status e andamento
// aplica-se a atividades, servicos e ordens de servicos
export const status = {
  classMap: (andamento, status) => {
    const andamentoMap = { InicioAtrasado: 'c-status-inicio-atrasado', TerminoAtrasado: 'c-status-termino-atrasado' }
    const statusMap = { Inicial: 'c-status-inicial', Transitorio: 'c-status-transitorio', Conclusao: 'c-status-conclusao', Cancelamento: 'c-status-cancelamento', Cadastramento: 'c-status-cadastramento' }
    return andamentoMap[andamento] || statusMap[status] || 'c-status-default'
  }
}

// inbox
export const inbox = {
  classMap: (v) => {
    const map = { ATRASADA: 'c-atrasada', HOJE: 'c-hoje', AMANHA: 'c-amanha', PROXIMAS: 'c-proxima', NAOPLANEJADA: 'c-naoplanejada' }
    return map[v] || 'c-indefinida'
  },
  titleMap: (v) => {
    const map = { ATRASADA: 'ATRASADAS', HOJE: 'PARA HOJE', AMANHA: 'PARA AMANHÃ', PROXIMAS: 'PRÓXIMAS', NAOPLANEJADA: 'NÃO PLANEJADAS' }
    return map[v] || 'INDEFINIDAS'
  }
}

// exports
export const app = {
  status,
  inbox
}

export default app
