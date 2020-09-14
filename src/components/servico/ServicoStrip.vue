<template>
  <div class="a-card">
    <div class="row text-bold a-text-dense-md c-header">
      <div class="col"><q-icon name="trip_origin" color="brand-3" class="q-mr-sm"/>{{ produtoNome }} ({{ card.elementos }})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicoStrip',

  props: { card: { type: Object, required: true } },

  computed: {
    produtoNome () {
      return `${this.card.categoria_nome} - ${this.card.produto_nome}`
    }
  }
}
</script>

<style lang="stylus" scoped>

.c-header
  padding 8px
  display flex
  align-items center
</style>
