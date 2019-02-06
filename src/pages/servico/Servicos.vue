<template>
  <q-page padding>
    <paleta-principal @acao="acao" :btn_adicionar="true" titulo="Ordens de Serviços"></paleta-principal>

    <q-search class="q-mb-sm" type="text" v-model="textoPesquisa" :debounce="200"  clearable inverted-light
      color="blue-grey-1" float-label="Nome do cliente"></q-search>

    <q-infinite-scroll :handler="loadMore">
      <div class="row q-pt-sm gutter-md">
        <div class="col-12" v-for="(servico, index) in listaFiltrada" :key="index">
          <card-servico :servico="servico"></card-servico>
        </div>
      </div>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import cardServico from "components/card/CardServico";
import paletaPrincipal from "../../components/button/paleta-principal";

export default {

  components: {
    cardServico,
    paletaPrincipal
  },

  data() {
    return {
      textoPesquisa: "",
      servicos: [],
      selectedOption: 1,
      pagination: {
        page: 1,
        min: 1,
        max: 5
      }
    };
  },

  methods: {
    acao(value) {
      switch (value) {
        case "novo":
          this.$router.push("/ordem-servico");
          break;
        default:
          console.log("Ação não recebida ou não implementa.");
          break;
      }
    },

    async listaServicos() {
      this.$q.loading.show();
      const data = await this.$store.dispatch("Servicos", 1);
      this.servicos = data.ordens_servicos ? data.ordens_servicos : [];
      this.$q.loading.hide();
    },

    async loadMore(index, done) {
      console.log("chamando manipulador do scroll");
      return done;
    }
  },
  computed: {
    servicosFiltered() {
      const start = this.pagination.page - 1;
      const offset = start + this.selectedOption;
      return this.servicos.slice(start, 5);
    },

    listaFiltrada() {
      return this.servicos.filter(servico => {
        return servico.cliente_nome.toLowerCase().includes(this.textoPesquisa.toLowerCase())
      })
    }
  },
  mounted() {
    this.listaServicos();
  }
};
</script>

<style>
</style>
