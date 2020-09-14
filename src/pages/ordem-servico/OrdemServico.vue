<template>
  <q-page>
    <form @submit.prevent="submit" @reset.prevent.stop="onReset">
      <div v-if="loaded" class="bg-white">
        <div class="row q-col-gutter-md q-mt-sm q-px-sm">
          <div class="col-xs-12 col-sm-6">
            <cliente-input module="OrdemServico" state="ordem_servico" ref="clienteInput" />
          </div>
          <div class="col-xs-12 col-sm-6 ">
            <paciente-input module="OrdemServico" state="ordem_servico" ref="pacienteInput"/>
          </div>

          <div class="col-xs-12 col-sm-6">
            <data-desejada-input module="OrdemServico" state="ordem_servico"/>
          </div>
          <div class="col-xs-12 col-sm-6">
            <caixa-input v-if="osTagParams" module="OrdemServico" state="ordem_servico"/>
          </div>
          <div>
            <span class="text-brand-5 a-text-dense-sm">Data do laboratório (automática):</span>
            <span class="a-text-dense-sm a-padding text-bold">{{dataPrevista}}</span>
            <q-icon name="motorcycle" color="brand-3" size="24px" class="q-mb-xs q-mr-md"></q-icon>
          </div>
        </div>

        <servico-card :servicos="stateServicos" />
        <valores-ordem-servico v-if="isEdit()" module="OrdemServico" state="ordem_servico"/>
        <material-card :materiais="listaMateriais" :materiaisEdicao="stateMateriais" module="OrdemServico" state="ordem_servico"/>

        <div class="row q-pa-sm">
          <div class="row col">
            <q-input class="col bg-white" v-model="observacao" label="Observação" outlined dense autogrow/>
          </div>
        </div>
        <image-uploader/>
        <!-- <save-buttons :submitting="submitting"/> -->
      </div>
    </form>
  </q-page>
</template>

<script>
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import { date } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'OrdemServicoPage',
  mixins: [StateMixin, ValidateMixin],
  props: {
    module: { type: String, default: 'OrdemServico' },
    state: { type: String, default: 'ordem_servico' },
    modo: { type: String }
  },
  data () {
    return {
      loaded: false,
      listaMateriais: ''
    }
  },
  computed: {
    ...mapState('OrdemServico', ['OrdemServicoEdit', 'OrdemServicoMateriais']),

    observacao: {
      get () { return this.getState('observacao') },
      set (value) { this.setState('observacao', value) }
    },
    osTagParams () { return this.$route.params.tag },
    dataPrevista () { return date.formatDate(this.getState('data_prevista'), 'DD/MM/YYYY HH:MM') },
    stateServicos () {
      return this.$store.state.OrdemServico.state.servicos || []
    },
    stateMateriais () { return this.$store.state.OrdemServico.state.materiais || [] }
  },
  async mounted () {
    this.loaded = false
    this.$q.loading.show()
    if (this.osTagParams) { await this.getOrdemServicoEdit(this.osTagParams) }
    let result = await this.getOrdemServicoMateriais()
    this.listaMateriais = result.success ? result.materiais : []
    this.$q.loading.hide()
    this.loaded = true
  },
  methods: {
    ...mapActions('OrdemServico', ['getOrdemServicoEdit', 'getOrdemServicoMateriais', 'postOrdemServicoEdit', 'putOrdemServicoEdit', 'setServicoInOrdemServico']),

    abandonar () {
      this.$router.replace({ name: 'os_list' })
    },
    isEdit () {
      return this.modo === 'edit'
    },
    mountPostOrdemServico () {
      let obj = {
        cliente_id: this.getState('cliente_id'),
        paciente_id: this.getState('paciente_id'),
        data_desejada: this.getState('data_desejada'),
        caixa: this.getState('caixa'),
        caixa_cor: this.getState('caixa_cor'),
        valor_cobrado: this.getState('valor_cobrado'),
        ajuste_percentual: this.getState('ajuste_percentual'),
        observacao: this.getState('observacao')
      }

      if (this.isEdit()) { obj.id = this.getState('os_tag') }
      return obj
    },
    onReset () {
      this.$router.replace('/ordens-servicos')
    },
    async send () {
      let postOrdemServico = this.mountPostOrdemServico()
      if (this.isEdit()) {
        return this.putOrdemServicoEdit({ obj: postOrdemServico, itemNotify: 'Ordem de Servico' })
      }
      return this.postOrdemServicoEdit({ obj: postOrdemServico, itemNotify: 'Ordem de Servico' })
    }

  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'servico_new' && to.name !== 'servico_edit') {
      this.$store.commit(`OrdemServico/CLEAR_STATE_ROOT`)
    }
    next()
  }
}
</script>
<style lang="stylus" scoped>
  .c-input {
    min-width: 304px;
  }
</style>
