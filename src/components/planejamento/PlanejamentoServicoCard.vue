<template>
  <div class="c-servico rounded-borders">
    <div class="row text-bold a-text-dense-md c-servico-header">
      <div class="col"><q-icon name="trip_origin" color="brand-3" class="q-mr-sm"/>{{ produtoNome }} ({{ servico.elementos }})</div>
      <div class="col-auto a-remove-btn-dd-arrow">
        <q-btn-dropdown flat round color="brand-1" size="sm" icon="more_vert">
          <q-list dense>
            <q-item v-if="permiteIncluirAtividade" clickable v-close-menu>
              <q-item-section>
                <q-item-label>Incluir Atividade</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="planejamento" clickable v-close-menu @click="aplicar">
              <q-item-section>
                <q-item-label>Liberar Execução</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div class="q-py-sm q-px-xs">
      <atividade-card v-for="(atividade, index) in servico.atividades" :key="index" :card="atividade"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ServicoCard',

  props: { servico: { type: Object, required: true } },

  methods: {
    ...mapActions('Planejamento', ['postPlanejamento']),

    aplicar () {
      this.postPlanejamento(this.servico.planejamento_id)
    }
  },

  computed: {
    produtoNome () {
      return `${this.servico.categoria_nome} - ${this.servico.produto_nome}`
    },

    planejamento () {
      return this.servico.servico_status_tipo === 'Planejamento'
    },

    permiteIncluirAtividade () {
      const status = this.servico.servico_status_tipo
      return status === 'Planejamento' || status === 'Inicial' || status === 'Transitorio'
    }
  }
}
</script>

<style lang="stylus" scoped>

.c-servico
  border 1px solid $grey-4
  background-color white
  flex-shrink 0
  flex-grow 1
  flex-basis 360px
  max-width 542px !important
  @media (max-width: 368px)
    flex-basis 304px

.c-servico-header
  padding 8px
  border-bottom 1px solid $grey-4
  display flex
  align-items center
</style>
