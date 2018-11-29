<template>
  <div>
    <app-botao prop_id="Home" prop_size="md" prop_icon="home" prop_title="home" prop_disabled prop_event_emitido="PaginaInicial" @PaginaInicial='PaginaInicial'></app-botao>
  </div>
</template>

<style></style>

<script>
import appBotao from '../atomicos/button.vue'

export default {
  components:{
    appBotao
  },
  methods:{
    PaginaInicial () {
      this.$router.push('/');
      }
    }
  }
</script>
