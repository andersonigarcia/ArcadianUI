<template>
  <app-botao-sair
    propAcao="SairApp"
    propIize="md"
    propIcon="exit_to_app"
    propTitle="Abandonar aplicação"
    propDisabled
    @SairApp="SairApp"
  ></app-botao-sair>
</template>

<style></style>

<script>
import appBotaoSair from "../atomicos/BaseButton.vue";

export default {
  components: {
    appBotaoSair
  },
  methods: {
    SairApp () {
      this.$q
        .dialog({
          color: "blue-grey-6",
          title: "Sair",
          message: "Deseja sair da aplicação?",
          ok: true,
          cancel: true,
          preventClose: true
        })
        .then(() => {
          //Fechar a aplicação
          console.log("...fechar a aplicação...");
          //   this.$q.notify('You said OK!')
        })
        .catch(() => {
          this.$q.notify(`Legal!!! Você preferiu permanece.`);
        });
    }
  }
};
</script>
