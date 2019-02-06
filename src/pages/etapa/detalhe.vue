<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <q-btn round flat color="primary" to="/minhasAtividades">
          <q-icon name="arrow_back"></q-icon>
          <q-tooltip>Voltar p/ Minhas Atividades</q-tooltip>
        </q-btn>
        <b><u>Detalhes da Etapa</u></b>
      </div>
    </div>

    <div class="row q-mt-md gutter-md q-mb-sm" v-if="etapa">
      <div class="col-12">
        <card-etapa :etapa="etapa"></card-etapa>
      </div>
    </div>

    <div class="row q-mb-sm" v-if="etapa">
      <div class="col-12">
        <card-tempo-etapa :etapa="etapa"></card-tempo-etapa>
      </div>
    </div>

    <div class="row q-mb-sm" v-if="etapa && etapa.status && etapa.status.length > 0">
      <div class="col-12">
        <list-etapa-historico :etapaStatus="etapa.status"></list-etapa-historico>
      </div>
    </div>

    <div class="row gutter-xs">
      <div class="col-12 col-md-2">
        <q-btn class="full-width" color="primary">Iniciar</q-btn>
      </div>
      <div class="col-12 col-md-2">
        <q-btn class="full-width" color="secondary">Pausar</q-btn>
      </div>
      <div class="col-12 col-md-2">
        <q-btn class="full-width" color="orange">Retomar</q-btn>
      </div>
      <div class="col-12 col-md-2">
        <q-btn class="full-width" color="grey">Concluir</q-btn>
      </div>
      <div class="col-12 col-md-2">
        <q-btn class="full-width" color="red">Cancelar</q-btn>
      </div>
      <div class="col-12 col-md-2">
        <q-btn class="full-width" color="black">Transferir</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import CardEtapa from 'components/CardEtapa'
import CardTempoEtapa from 'components/CardTempoEtapa'
import ListEtapaHistorico from 'components/ListEtapaHistorico'

export default {
  components: {
    CardEtapa,
    CardTempoEtapa,
    ListEtapaHistorico
  },

  data () {
    return {
      etapa: null
    }
  },

  async mounted () {
    this.$q.loading.show()
    this.etapa = await this.$store.dispatch('getAtividadeById', this.$route.params.id)
    this.$q.loading.hide()
  }
}
</script>
