<template>
  <app-botao prop_id="FaturaMes" prop_size="md" prop_icon="assessment" prop_title="Fatura no mês" prop_disabled prop_event_emitido="ExibirFaturaMes" @ExibirFaturaMes="ExibirFaturaMes"></app-botao>
</template>

<style></style>

<script>
import appBotao from "../atomicos/button.vue";

export default {
  components: {
    appBotao
  },
  methods:{
    ExibirFaturaMes (){
      console.log("...evento ExibirFaturaMes recebido com sucesso.")
    }
  }
}
</script>

