<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <q-btn round flat color="primary" to="/minhasAtividades">
          <q-icon name="arrow_back"></q-icon>
          <q-tooltip>Voltar p/ Minhas Atividades</q-tooltip>
        </q-btn>
        <b><u>Detalhes do Serviço</u></b>
      </div>
    </div>

    <div class="row q-mt-md gutter-md q-mb-xl">
      <div class="col-12">
        <card-servico v-if="servico" :servico=servico></card-servico>
      </div>
    </div>

    <b v-if="servico && servico.atividades.length > 0"><u>Atividades</u></b>

    <div class="row q-mt-md gutter-md q-mb-xl" v-if="servico && servico.atividades.length > 0">
      <div class="col-12" v-for="(atividade, index) in servico.atividades" :key="index" >
        <card-atividade :atividade="atividade"></card-atividade>
      </div>
    </div>
  </q-page>
</template>

<script>
import CardServico from 'components/CardServico'
import CardAtividade from 'components/CardAtividade'

export default {
  components: {
    CardServico,
    CardAtividade
  },

  data () {
    return {
      servico: null
    }
  },

  async mounted () {
    this.$q.loading.show()
    this.servico = await this.$store.dispatch('getServicoByTag', this.$route.params.tag)
    this.$q.loading.hide()
  }
}
</script>
