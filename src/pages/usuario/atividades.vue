<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <b><u>Minhas Atividades</u></b>
      </div>
    </div>

    <div class="row items-center nowrap q-mb-md">
      <div class="col-12">
        <q-search
          type="text"
          v-model="searchText"
          :debounce="500"
          clearable
          stack-label="Pesquisar"
          placeholder=" "
          color="amber"
          inverted-light
          @input="search"
        ></q-search>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-list highlight v-for="(grupo, index) in agrupamentos" :key="index" class="q-mb-md">
          <q-list-header>{{ grupo.nome }}</q-list-header>
          <q-item link v-for="atividade in grupo.atividades" :key="atividade.atividade_id" :to="`/minhasAtividades/atividade/${atividade.atividade_id}`">
            <q-item-main :label="atividade.atividade_nome" />
            <q-item-side right @click="alert(atividade.atividade_id)">
              <q-btn style="z-index: 9999;" flat round :to="`/minhasAtividades/servico/${atividade.servico_tag}`">
                <q-icon name="details"></q-icon>
                <q-tooltip>
                  Detalhes do Serviço
                </q-tooltip>
              </q-btn>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'MinhasAtividades',

  data () {
    return {
      searchText: '',
      agrupamentos: []
    }
  },

  methods: {
    async search () {
      if (this.searchText.length === 0) {
        this.listAtividades()
      } else {
        this.searchAtividades(this.searchText)
      }
    },

    async listAtividades () {
      this.$q.loading.show()
      const data = await this.$store.dispatch('listAtividades')
      this.agrupamentos = data || []
      this.$q.loading.hide()
    },

    async searchAtividades (text) {
      const data = await this.$store.dispatch('searchAtividades', text)
      this.agrupamentos = data || []
    }
  },

  mounted () {
    this.listAtividades()
  }
}
</script>
