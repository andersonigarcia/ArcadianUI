<template>
  <div>
    <app-botao prop_id="Tarefas" prop_size="md" prop_icon="assignment" prop_title="Tarefas" prop_disabled prop_event_emitido="ExibirTarefas" @ExibirTarefas='ExibirTarefas'></app-botao>
  </div>
</template>

<style> </style>

<script>
  import appBotao from "../atomicos/button";

  export default{
    components:{
        appBotao
    },
    methods:{
      ExibirTarefas (){
        this.$router.push('/tarefas')
        console.log("...evento ExibirTarefas recebido com sucesso.")
      }
    }
  }
</script>
