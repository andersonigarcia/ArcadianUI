<template>
  <div class="a-card-shape" style="padding-bottom:0px">
    <div class="q-py-sm">
      <q-icon class="q-ml-sm q-mr-xs" name="trip_origin" style="font-size: 24px" :class="status"/>
      {{ titulo }}
    </div>
    <q-separator/>
    <div class="c-atividade" v-for="(atividades, horario) in agenda" :key="horario">
      <inbox-item :card="atividades" :horario="horario" />
    </div>
  </div>
</template>

<script>
import { inbox } from 'utils/app'
import { groupBy } from 'utils/array.js'

export default {
  props: {
    agrupamento: { type: String, required: true },
    atividades: { type: Array, required: true }
  },

  computed: {
    agenda () {
      return groupBy(this.atividades, 'inicio')
    },
    titulo () {
      return inbox.titleMap(this.agrupamento)
    },
    status () {
      return inbox.classMap(this.agrupamento)
    }
  }
}
</script>

<style lang="stylus" scoped>

.c-atividade
  border-bottom 1px solid $grey-4
  padding 6px 0px
.c-atividade:last-of-type
  border-bottom 0px

.c-atrasada
  color: $inbox-atrasada
.c-hoje
  color: $inbox-hoje
.c-amanha
  color: $inbox-atrasada
.c-proxima
  color: $inbox-proxima
.c-naoplanejada
  color: $inbox-naoplanejada
.c-indefinida
  color: $inbox-indefinida
</style>
