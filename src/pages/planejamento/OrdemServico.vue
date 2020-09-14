<template>
  <q-page padding>
    <ordem-servico-card v-if="ordemServico" :card="ordemServico" :acoes="{detalhes: true, editar: true}"/>
    <div dense class="row q-mt-sm q-gutter-sm a-text-dense">
      <planejamento-servico-card v-for="(servico, index) in servicos" :key="index" :servico="servico"/>
    </div>
    <page-loading :showing="!ordemServico"/>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OrdemServico',

  props: ['tag'],

  computed: {
    ...mapState('Planejamento', ['Planejamento']),

    state () {
      return this.Planejamento.data
    },
    ordemServico () {
      return this.state ? this.state.ordem_servico : false
    },
    servicos () {
      return this.state ? this.state.servicos : false
    }
  },

  methods: {
    ...mapActions('Planejamento', ['getPlanejamento']),
    ...mapMutations('Planejamento', ['SET_PLANEJAMENTO'])
  },

  async mounted () {
    await this.getPlanejamento(this.tag)
  },

  beforeRouteLeave (to, from, next) {
    this.SET_PLANEJAMENTO({})
    next()
  }
}
</script>
