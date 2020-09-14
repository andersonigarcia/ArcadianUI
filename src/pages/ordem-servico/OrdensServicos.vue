<template>
  <q-page padding class="c-page">
    <q-infinite-scroll @load="load" :offset="10" ref="scroll">
      <search-input v-model="filtro" add @add="add" ref="search"/>
      <div class="row q-gutter-sm">
        <ordem-servico-card v-for="(card, index) in state" :key="index" :card="card" acoes="todas"/>
      </div>
      <template v-slot:loading>
        <q-spinner-dots color="brand-3" size="2em"/>
      </template>
    </q-infinite-scroll>
    <div class="a-page-footer">{{ state.length }} registro(s)</div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="brand-3" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { simpleSearch } from 'utils/smart-search'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'OrdensServicos',

  data () { return { cards: [], filtro: '', pagina: 0 } },

  computed: {
    ...mapState('OrdemServico', ['OrdensServicosPage']),

    state () {
      // na criacao tudo esta vazio, aguardamos o infinite-scroll acionar o load
      if (this.cards.length === 0 && this.filtro === '') return []
      // se estiver carregando nao queremos reatividade
      if (this.loading) return []
      // este compute é reativo ao filtro da pesquisa
      let state = simpleSearch(this.cards, this.filtro, ['cliente_nome', 'profissional_nome', 'paciente_nome', 'os_tag'])
      // se o filtro nao achou nada local forçamos a carga do infinite-scroll (assincrono)
      // observe que o infinite-scroll continua carregando novas paginas até completar o height
      // ou todas as paginas até terminar as paginas, esse comportamento é o desejado
      state.length === 0 && this.$refs.scroll.trigger()
      return state
    }
  },

  methods: {
    ...mapActions('OrdemServico', ['getOrdensServicosPage', 'resetOrdemServicoEdit']),

    async load (index, done) {
      // se a paginacao terminou nao carregamos mais nada
      if ((this.OrdensServicosPage.pagination || {}).done) return
      this.pagina++
      // aqui dispara a reatividade no state mas bate na flag de guarda
      this.loading = true
      await this.getOrdensServicosPage(this.pagina)
      this.loading = false
      if (!this.OrdensServicosPage.success) {
        this.pagina--
        return
      }
      if (done && {}.toString.call(done) === '[object Function]') done()
      // se a paginacao terminou nao queremos que o infinite-scroll tente carregar mais
      if (this.OrdensServicosPage.pagination.done) this.$refs.scroll.stop()
      // finalmente alimentamos nossa lista com os registros da nova pagina carregada
      const state = this.OrdensServicosPage.ordens_servicos || []
      this.cards.splice(this.cards.length, 0, ...state)
    },

    add () {
      this.$router.push('/ordens-servicos/edit')
    },

    created () {
      // flag de guarda filtro vs carga da lista
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-page .a-card:last-of-type
  margin-bottom 72px
</style>
