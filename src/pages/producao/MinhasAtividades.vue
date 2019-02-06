<template>
  <q-page padding>
    <paleta-principal @acao="acao" :btn_adicionar="true" titulo="Minhas Atividades"></paleta-principal>

    <q-search
      class="q-mb-sm"
      type="text"
      v-model="searchText"
      :debounce="200"
      @input="search"
      clearable
      inverted-light
      color="blue-grey-1"
    ></q-search>

    <div class="row">
      <div class="col">
        <q-list
          highlight
          v-for="(grupo, index) in agrupamentos.atividades"
          :key="index"
          class="q-mb-md"
        >
          <q-list-header>{{ grupo.agrupamento }}</q-list-header>
          <q-item
            link
            v-for="atividade in agrupamentos.atividades"
            :key="atividade.atividade_id"
            :to="`/minhasAtividades/atividade/${atividade.execucao_id}`"
          >
            <q-item-main :label="atividade.atividade_nome"/>
            <q-item-side right @click="alert(atividade.execucao_id)">
              <q-btn
                style="z-index: 9999;"
                flat
                round
                :to="`/minhasAtividades/servico/${atividade.servico_tag}`"
              >
                <q-icon name="details"></q-icon>
                <q-tooltip>Detalhes do Serviço</q-tooltip>
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
import paletaPrincipal from "../../components/button/paleta-principal";

export default {
  name: "MinhasAtividades",
  components: {
    paletaPrincipal
  },
  data() {
    return {
      searchText: "",
      agrupamentos: []
    };
  },

  methods: {
    acao() {},
    async search() {
      if (this.searchText.length === 0) {
        this.listAtividades();
      } else {
        this.searchAtividades(this.searchText);
      }
    },

    async listAtividades() {
      this.$q.loading.show();
      const data = await this.$store.dispatch("listAtividades");
      debugger;
      this.agrupamentos = data || [];
      this.$q.loading.hide();
    },

    async searchAtividades(text) {
      const data = await this.$store.dispatch("searchAtividades", text);
      this.agrupamentos = data || [];
    }
  },
  filters: {},

  mounted() {
    this.listAtividades();
  }
};
</script>
