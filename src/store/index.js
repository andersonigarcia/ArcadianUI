import Vue from 'vue'
import Vuex from 'vuex'

import Atividade from '../store/atividade'
import Categoria from '../store/categoria'
import Cliente from '../store/cliente'
import Colaborador from '../store/colaborador'
import Competencia from '../store/competencia'
import Global from '../store/global'
import Inbox from '../store/inbox'
import OrdemServico from '../store/ordem-servico'
import Pessoa from '../store/pessoa'
import Planejamento from '../store/planejamento'
import Produto from '../store/produto'
import Workflow from '../store/workflow'
import Servico from '../store/servico'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Atividade,
      Categoria,
      Cliente,
      Colaborador,
      Competencia,
      Global,
      Inbox,
      OrdemServico,
      Pessoa,
      Planejamento,
      Produto,
      Workflow,
      Servico
    }
  })

  return Store
}
