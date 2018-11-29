<template >
  <app-botao prop_id="Mensagens" prop_size="md" prop_icon="mail_outline" prop_title="Mensagens" prop_event_emitido="ExibirMensagem" @ExibirMensagem="ExibirMensagem"></app-botao>
</template>

<style> </style>

<script>
import appBotao from "../atomicos/button.vue";

export default {
  components: {
    appBotao
  },
  data (){
      return{
        mesagem:'Nenhuma mensagem encontrada',
        showing: false
      }
    },
  methods:{
    ExibirMensagem () {
      console.log("...evento ExibirMensagem recebido com sucesso.")
    }
  }

}
</script>

