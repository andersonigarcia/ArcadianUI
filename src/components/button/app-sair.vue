<template>
  <app-botao-sair prop_id="SairAplicao"
                  prop_size="md"
                  prop_icon="exit_to_app"
                  prop_title="Abandonar aplicação"
                  prop_disabled
                  prop_event_emitido="SairApp"
                  @SairApp='Sair'>
  </app-botao-sair>
</template>

<style></style>

<script>
import appBotaoSair from "../atomicos/button.vue";

export default {
  components: {
    appBotaoSair
  },
  methods:{
      Sair(){
        this.$q.dialog({
                color:'blue-grey-6',
                title: 'Sair',
                message: 'Deseja sair da aplicação?',
                ok: true,
                cancel: true,
                preventClose: true
              }).then(() => {
                  //Fechar a aplicação
                  console.log("...fechar a aplicação...")
                  //   this.$q.notify('You said OK!')
              }).catch(() => {
                this.$q.notify(`Legal!!! Você preferiu permanece.`)
              })
      }
  }
}
</script>
