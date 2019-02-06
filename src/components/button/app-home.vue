<template>
  <div>
    <app-botao
      propAcao="PaginaInicial"
      propSize="md"
      propIcon="home"
      propTitle="Home"
      propDisabled
      @PaginaInicial="PaginaInicial"
    ></app-botao>
  </div>
</template>

<style></style>

<script>
import appBotao from "../atomicos/BaseButton.vue";

export default {
  components: {
    appBotao
  },
  methods: {
    PaginaInicial() {
      this.$router.push("/");
    }
  }
};
</script>
