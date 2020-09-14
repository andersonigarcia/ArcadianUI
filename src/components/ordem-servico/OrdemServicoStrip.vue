<template>
  <q-item class="col a-card">
    <q-item-section side class="a-card-left">
      <div class="c-tag">{{card.os_tag}}</div>
    </q-item-section>
    <q-item-section>
      <div class="row">
        <div class="col-grow c-profissional">
          <q-item-label class="a-text-dense-ab">{{ card.profissional_nome }}</q-item-label>
          <q-item-label class="a-text-dense-sm text-brand-5">{{ card.paciente_nome }}</q-item-label>
        </div>
        <caixa-icon v-if="card.caixa" class="q-ml-sm" :caixa="card.caixa" :caixaCor="card.caixa_cor"/>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: { card: { type: Object, required: true } }
}
</script>

<style lang="stylus" scoped>

.c-tag
  padding 0px 10px 0px 10px
  color white
  background-color $brand-3
  position: relative
  border-radius 4px 4px 4px 0
  margin-left -16px

.c-tag:after
  content ""
  position absolute
  top 100%
  left 0
  width 0
  height 0
  border 0 solid transparent
  border-top-color $brand-1
  border-width 6px 0 0 7px

.c-profissional
  min-width 180px
</style>
