<template>
  <q-page padding>
    <div v-if="atividade">
      <ordem-servico-strip :card="atividade"/>
      <servico-strip :card="atividade" class="q-mt-sm"/>
      <atividade-strip :card="atividade" class="a-card-shape q-mt-sm"/>
    </div>
    <page-loading :showing="!atividade"/>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Atividade',

  props: ['id', 'pid', 'aid'],

  computed: {
    ...mapState('Planejamento', ['Atividade']),
    state () { return this.Atividade.data },
    atividade () { return this.state ? this.state.atividade : false }
  },

  methods: {
    ...mapActions('Planejamento', ['getAtividadeExecucao', 'getAtividadePlanejamento']),
    ...mapMutations('Planejamento', ['SET_ATIVIDADE'])
  },

  async mounted () {
    this.id
      ? await this.getAtividadeExecucao(this.id)
      : await this.getAtividadePlanejamento({ pid: this.pid, aid: this.aid })
  },

  beforeRouteLeave (to, from, next) {
    this.SET_ATIVIDADE({})
    next()
  }
}
</script>

<style lang="stylus" scoped>
</style>
