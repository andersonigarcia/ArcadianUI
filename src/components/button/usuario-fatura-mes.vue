<template>
  <app-botao
    propAcao="ExibirFaturaMes"
    propTitle="Fatura no mês"
    propSize="md"
    propIcon="assessment"
    propDisabled
    @ExibirFaturaMes="ExibirFaturaMes"
  ></app-botao>
</template>

<style></style>

<script>
import appBotao from "../atomicos/BaseButton.vue";

export default {
  components: {
    appBotao
  },
  methods: {
    ExibirFaturaMes() {
      console.log("...evento ExibirFaturaMes recebido com sucesso.");
    }
  }
};
</script>

