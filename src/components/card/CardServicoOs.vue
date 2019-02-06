<template>
  <div>
    <q-card >
      <q-card-main class="cabecalho row .col-12 justify-between">
        <div class="no-margin text-weight-bolder">{{ produtoNome }} </div>
        <div :class="destaqueValor">- {{ valorCobrado }}</div>
        <div>
          <app-button propAcao="DeletarServico" propSize="sm" propIcon="delete" propTitle="Deletar serviço"
            @DeletarServico="DeletarServico"></app-button>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import moment from "moment";
import appButton from "../atomicos/BaseButton";
export default {
  components: {
    appButton
  },
  props: ['servico'],

  methods: {
    ToPascalCase(str) {
      if (str === null || str === "") return false;
      else str = str.toString();

      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    DeletarServico(id) {
      console.log("Deletar serviço");
    }
  },
  computed: {
    produtoNome() {
      var produtoNome = this.servico.categoria_nome + " - " + this.servico.produto_nome;
      return this.ToPascalCase(produtoNome);
    },
    destaqueValor() {
      return this.servico.ajuste_percentual != 0 || this.servico.ajuste_valor != 0 ? `text-positive` : `text-indigo`
    },

    valorCobrado() {

      return this.servico.valor_cobrado ? this.servico.valor_cobrado.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          currencyDisplay: 'symbol',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) :
        0

    }
  }
};
</script>
<style>
.cabecalho {
  /* background-color: gainsboro; */
  background-color: whitesmoke;
}
</style>


