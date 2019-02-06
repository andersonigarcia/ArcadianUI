<template>
  <div>
    <app-botao
      propAcao="ExibirTarefas"
      propSize="md"
      propIcon="assignment"
      propTitle="Tarefas"
      propDisabled
      @ExibirTarefas="ExibirTarefas"
    ></app-botao>
  </div>
</template>

<style>
</style>

<script>
import appBotao from "../atomicos/BaseButton";

export default {
  components: {
    appBotao
  },
  methods: {
    ExibirTarefas() {
      this.$router.push("/tarefas");
      console.log("...evento ExibirTarefas recebido com sucesso.");
    }
  }
};
</script>
