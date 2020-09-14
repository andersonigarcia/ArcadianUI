<template>
  <div class="row a-card-size c-atividade" v-on="$listeners">
    <div class="col-4 q-pr-md text-right">
      <span class="a-text-dense-xs text-brand-5">{{ card.inicio | getData() }} </span>
      <span class="a-text-dense-sm">{{ card.inicio | getHora()}} às {{ card.termino | getHora()}}</span>
      <span class="a-text-dense-xs text-brand-5">{{ dataTermino }}</span>
    </div>
    <div class="c-dot" :class="andamento"></div>
    <div class="col c-nucleo">
      <div class="a-text-dense-md q-mb-sm">{{ card.atividade_nome }}</div>
      <div class="a-text-dense-ab text-brand-5">{{ card.colaborador_nome }}</div>
      <div class="a-text-dense-sm text-brand-5">{{ card.status_nome }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import app from 'utils/app'
import date from 'utils/date'

export default {
  name: 'AtividadeStrip',

  props: { card: { type: [Object, Boolean], required: true } },

  filters: {
    getData: date.ddmm,
    getHora: date.hhmm
  },

  computed: {
    dataTermino () {
      const getData = this.$options.filters.getData
      const inicio = getData(this.card.inicio)
      const termino = getData(this.card.termino)
      return inicio === termino ? '' : ' ' + termino
    },

    andamento () {
      return app.status.classMap(this.card.andamento, this.card.status_tipo)
    }
  }
}
</script>

<style lang="stylus" scoped>
// clickable
.c-atividade
  cursor pointer !important
  user-select none !important
  outline 0

// cria os dots da timeline
.c-dot
  display table-cell
  position relative
  top 0
  bottom 0
  &:before, &:after
    content ''
    background $grey-6
    display block
    position absolute
  &:before
    border 3px solid transparent
    border-radius 100%
    opacity 0.8
    height 10px
    width 10px
    top 4px
    left 0
  &:after
    opacity 0.4
    width 2px
    top 18px
    left 4px
    bottom 0

.c-atividade:last-child .c-dot:after
  content none

.c-nucleo
  padding-left 24px
  margin-bottom 16px

.c-atividade:last-child .c-nucleo
  margin-bottom 0

// seta codigo de cores da timeline
.c-status-
  &inicio-atrasado
    &:before, &:after
      background $status-inicio-atrasado
  &termino-atrasado
    &:before, &:after
      background $status-termino-atrasado
  &inicial
    &:before, &:after
      background $status-inicial
  &transitorio
    &:before, &:after
      background $status-transitorio
  &conclusao
    &:before, &:after
      background $status-conclusao
  &cancelamento
    &:before, &:after
      background $status-cancelamento
  &default
    &:before, &:after
      background $status-default
</style>
