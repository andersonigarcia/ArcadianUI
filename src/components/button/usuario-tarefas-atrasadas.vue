<template>
    <app-botao prop_id="TarefasAtrasadas" prop_size="md" prop_icon="assignment_late" prop_title="Tarefas atrasadas" prop_disabled prop_event_emitido="ExibirTarefasAtrasadas" @ExibirTarefasAtrasadas='ExibirTarefasAtrasadas'></app-botao>
</template>

<style> </style>

<script>
import appBotao from "../atomicos/button.vue";

export default {
  components:{
    appBotao
  },
  methods:{
    ExibirTarefasAtrasadas(){
      console.log("...evento ExibirTarefasAtrasadas recebido com sucesso.")
    }
  }
}
</script>
