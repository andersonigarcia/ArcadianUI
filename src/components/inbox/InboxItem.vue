<template>
  <div class="row items-center c-item">
    <div class="col-2 column text-center c-time-left">
      <div class="col-auto" :class="[colisoes ? 'c-timebox-colisoes' : 'c-timebox']">
        <div class="a-text-dense-md">{{ horario | getHora()}}</div>
        <div class="a-text-dense-xs" :class="[colisoes ? '' : 'text-brand-5']">{{ horario | getData() }} </div>
      </div>
    </div>
    <div class="c-dot" :class="status"/>
    <div class="col column">
      <div class="col row items-center c-nucleo" v-for="(atividade, index) in card" :key="index" @click="clicked(atividade)">
        <div class="col a-text-dense-md" :class="[atividade.execucao == 'Disponivel' ? '' : 'text-brand-6']"><span class="a-text-dense-xs">{{ atividade.os_tag }}: </span>{{ atividade.atividade_nome }}<span class="a-text-dense-xs"> ({{ atividade.elementos }})</span></div>
        <caixa-icon v-if="atividade.caixa" :caixa="atividade.caixa" :caixaCor="atividade.caixa_cor"/>
        <div class="col column text-center c-time-right">
          <span class="a-text-dense-md">{{ atividade.termino | getHora()}}</span>
          <span class="a-text-dense-xs text-brand-5">{{ dataTermino(index) }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import app from 'utils/app'
import date from 'utils/date'

export default {

  props: {
    card: { type: Array, required: true },
    horario: { type: String, required: true }
  },

  filters: {
    getData: date.ddmm,
    getHora: date.hhmm
  },

  computed: {
    colisoes () {
      return this.card[0].colisoes
    },

    status () {
      return app.inbox.classMap(this.card[0].agrupamento)
    }
  },

  methods: {
    dataTermino (i) {
      const getData = this.$options.filters.getData
      const inicio = getData(this.card[i].inicio)
      const termino = getData(this.card[i].termino)
      return inicio === termino ? '' : ' ' + termino
    },

    clicked (atividade) {
      const dia = date.isoDate(atividade.inicio)
      const hora = date.hhmm(atividade.inicio)
      this.$router.push(`/inbox/${dia}/${hora}/${atividade.os_tag}`)
    }
  }
}
</script>

<style lang="stylus" scoped>

// clickable
.c-item
  cursor pointer !important
  user-select none !important
  outline 0

.c-timebox
  border 1px solid transparent
  padding 2px

.c-timebox-colisoes
  color $negative
  border-radius 4px
  border 1px solid $negative
  padding 2px

.c-time-left
  max-width 44px
  padding-right 4px

.c-time-right
  max-width 44px
  padding-left 4px

.c-nucleo
  padding-left 14px
  min-height 2.4em

// cria os dots da timeline
.c-dot
  display table-cell
  position relative
  bottom 0
  &:before
    content ''
    background $grey-6
    display block
    position absolute
    border 3px solid transparent
    border-radius 100%
    opacity 1
    height 6px
    width 6px
    top -3px
    left 0

.c-item:last-child .c-nucleo
  margin-bottom 0

.c-atrasada:before
  background: $inbox-atrasada
.c-hoje:before
  background: $inbox-hoje
.c-amanha:before
  background: $inbox-atrasada
.c-proxima:before
  background: $inbox-proxima
.c-naoplanejada:before
  background: $inbox-naoplanejada
.c-indefinida:before
  background: $inbox-indefinida
</style>
