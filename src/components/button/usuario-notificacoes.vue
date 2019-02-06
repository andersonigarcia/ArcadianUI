<template >
  <app-botao
    propAcao="ExibirMensagem"
    propTitle="Mensagens"
    propSize="md"
    propIcon="mail_outline"
    @ExibirMensagem="ExibirMensagem"
  ></app-botao>
</template>

<style>
</style>

<script>
import appBotao from "../atomicos/BaseButton.vue";

export default {
  components: {
    appBotao
  },
  data() {
    return {
      mesagem: "Nenhuma mensagem encontrada",
      showing: false
    };
  },
  methods: {
    ExibirMensagem() {
      console.log("...evento ExibirMensagem recebido com sucesso.");
    }
  }
};
</script>

