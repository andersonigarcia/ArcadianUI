<template>
  <div class="c-caixa text-center">
    <q-icon class="c-icon" size="1.6em" :class="cor" name="inbox"/>
    <div class="c-code a-text-dense-xs" :class="cor">{{ caixa }}</div>
  </div>
</template>

<script>
export default {
  name: 'CaixaIcon',
  props: ['caixa', 'caixaCor'],
  computed: {
    cor () {
      switch (this.caixaCor) {
        case 'Amarela': return 'c-amarela'
        case 'Azul': return 'c-azul'
        case 'Branca': return 'c-branca'
        case 'Verde': return 'c-verde'
        case 'Vermelha': return 'c-vermelha'
        default: return 'c-default'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-caixa
  white-space pre-wrap
  word-wrap break-word
  word-break break-all
  white-space normal
  position relative
  max-width 66px
.c-code
  margin-top -1px

// cores das caixas
.c-amarela
  color $caixa-amarela
  text-color $caixa-amarela
.c-azul
  color $caixa-azul
  text-color $caixa-azul
.c-branca
  color $caixa-branca
  text-color $caixa-branca
.c-verde
  color $caixa-verde
  text-color $caixa-verde
.c-vermelha
  color $caixa-vermelha
  text-color $caixa-vermelha
.c-default
  color $caixa-default
  text-color $caixa-default
</style>
