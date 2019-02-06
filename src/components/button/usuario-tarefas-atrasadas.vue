<template>
  <app-botao
    propAcao="ExibirTarefasAtrasadas"
    propTitle="Tarefas em atraso"
    propSize="md"
    propIcon="assignment_late"
    propDisabled
    @ExibirTarefasAtrasadas="ExibirTarefasAtrasadas"
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
  methods: {
    ExibirTarefasAtrasadas() {
      console.log("...evento ExibirTarefasAtrasadas recebido com sucesso.");
    }
  }
};
</script>
