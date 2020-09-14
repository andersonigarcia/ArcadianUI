<template>
  <q-item class="col a-card" :class="{'a-card-alert': alert}">
    <q-item-section side class="justify-between a-card-left">
      <div class="c-tag">{{card.os_tag}}</div>
      <caixa-icon v-if="card.caixa" :caixa="card.caixa" :caixaCor="card.caixa_cor"/>
      <div class="text-center">
        <div class="a-text-dense-xs text-bold">{{ card.data_entrada | getData() }}</div>
        <div class="a-text-dense-xs">{{ card.data_entrada | getHora() }}</div>
      </div>
    </q-item-section>
    <q-item-section>
      <div class="row items-start">
        <q-item-label class="col row justify-between items-center">
          <div class="col-3 text-left" :class="{'text-negative': alert}">
            <div :class="[dataDesejadaIsSet ? 'a-text-dense-lg text-bold' : 'a-text-dense-ab']">{{ card.data_desejada | getData() }}</div>
            <div :class="{'a-text-dense-md':dataDesejadaIsSet}">{{ card.data_desejada | getHora() }}</div>
            <div class="a-text-caption-xs text-brand-5">{{ dataDesejadaLabel }}</div>
          </div>
          <div class="col-6 text-center a-text-caption-xs column">
            <div>{{ prazo_previsto_desejado }}</div>
            <q-separator inset class="a-hr-horizontal"/>
            <div>{{ prazo_restante_agora }}</div>
          </div>
          <div class="col-3 text-right" :class="{'text-negative': alert}">
            <div :class="[dataPrevistaIsSet ? 'a-text-dense-lg text-bold' : 'a-text-dense-ab']">{{ card.data_prevista | getData() }}</div>
            <div :class="{'a-text-dense-md':dataPrevistaIsSet}">{{ card.data_prevista | getHora() }}</div>
            <div class="a-text-caption-xs text-brand-5">{{ dataPrevistaLabel }}</div>
          </div>
        </q-item-label>
        <ordem-servico-menu :tag="card.os_tag" :acoes="acoes"/>
      </div>
      <div class="row">
        <div class="col-grow c-cliente">
          <q-separator inset spaced color="transparent"/>
          <q-item-label class="a-text-dense-ab">{{ card.profissional_nome }}</q-item-label>
          <q-item-label class="a-text-dense-sm text-brand-5">{{ card.paciente_nome }}</q-item-label>
        </div>
        <div class="col-auto">
          <q-separator inset spaced color="transparent"/>
          <q-item-label class="a-text-dense-ab q-mr-sm c-status" :class="status">{{ statusTag }}</q-item-label>
        </div>
      </div>
      <template v-if="servicosProdutos">
        <q-separator inset spaced color="transparent"/>
        <ul class="c-servicos">
          <li v-if="servicosProdutos" class="a-text-caption-xs text-brand-5" style="white-space: pre-line;">{{ servicosProdutos }}</li>
        </ul>
      </template>
    </q-item-section>
  </q-item>
</template>

<script>
import app from 'utils/app'
import date from 'utils/date'

export default {
  name: 'OrdemServicoCard',
  props: {
    acoes: [Object, String],
    card: { type: Object, required: true }
  },

  filters: {
    getData: date.ddmm,
    getHora: date.hhmm
  },

  computed: {
    prazo_previsto_desejado () {
      return this.card.prazo_previsto_desejado || 'Indefinido'
    },
    prazo_restante_agora () {
      return this.card.prazo_restante_agora || 'Indefinido'
    },
    alert () {
      return this.prazo_previsto_desejado.substring(0, 1) === '-' || this.prazo_restante_agora.substring(0, 1) === '-'
    },
    dataDesejadaIsSet () {
      return !!this.card.data_desejada
    },
    dataPrevistaIsSet () {
      return !!this.card.data_prevista
    },
    dataDesejadaLabel () {
      return this.card.data_desejada ? 'Desejada' : 'Data desejada não definida'
    },
    dataPrevistaLabel () {
      return this.card.data_prevista ? 'Laboratório' : 'Data laboratório não definida'
    },
    servicosProdutos () {
      return this.card.servicos_produtos ? this.card.servicos_produtos.split('\n').join(', ') : false
    },
    status () {
      return app.status.classMap(this.card.ordem_servico_andamento, this.card.ordem_servico_status_tipo)
    },
    statusTag () {
      if (this.card.ordem_servico_andamento === 'InicioAtrasado') return 'Atrasada'
      if (this.card.ordem_servico_andamento === 'TerminoAtrasado') return 'Atrasada'
      return this.card.ordem_servico_status
    }
  }
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

.c-cliente
  min-width 220px

.c-servicos
  margin 0
  padding 0
  list-style-position inside

.c-status
  padding 2px 6px !important
  border-radius 4px

.c-status-
  &inicio-atrasado, &termino-atrasado
    background $status-termino-atrasado
    color white
  &inicial
    background $status-inicial
    color white
  &transitorio
    background $status-transitorio
  &conclusao
    background $status-conclusao
  &cancelamento
    background $status-cancelamento
  &default
    background $status-default
  &cadastramento
    background $status-cadastramento
</style>
