<template>
  <q-dialog v-model="show" v-on="$listeners" ref="dialog" persistent>
    <div class="column q-gutter-xs q-pa-sm items-center bg-white c-dialog">
      <div class="col row justify-center">
        <date-input v-model="dataInicio" label="Data início" :input-style="style" class="c-date"/>
        <time-input v-model="horaInicio" label="Hora início" :input-style="style" class="c-time"/>
      </div>
      <div class="col row justify-center">
        <date-input v-model="dataTermino" label="Data término" :input-style="style" class="c-date"/>
        <time-input v-model="horaTermino" label="Hora término" :input-style="style" class="c-time"/>
      </div>
      <q-select class="col c-select" v-model="executante" label="Executante" :options="executanteOptions" @filter="executanteFilter" map-options use-input hide-selected input-debounce="0" emit-value outlined dense options-dense stack-label>
        <template v-slot:no-option><q-item><q-item-section class="text-grey">Nenhum colaborador encontrado</q-item-section></q-item></template>
        <template v-slot:append><q-icon name="clear" @click.stop="executante = null" /></template>
      </q-select>
      <div class="col-auto q-gutter-sm q-my-sm">
        <q-btn class="c-button" label="Ok" :color="defaultOk" :text-color="defaultCancel" @click="option('ok')" ref="ok"/>
        <q-btn class="c-button" label="Cancelar" :color="defaultCancel" :text-color="defaultOk" v-close-popup @click="option('cancel')" ref="cancel"/>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import ConfirmationDialogMixin from 'mixins/comum/confirmation-dialog'
import { mapActions } from 'vuex'
import date from 'utils/date'

let executantes = []

export default {
  name: 'AtividadeDialog',

  mixins: [ConfirmationDialogMixin],

  data () {
    return {
      executanteOptions: [],
      executante: '',
      lDataTermino: '',
      lDataInicio: '',
      lHoraInicio: '',
      lHoraTermino: ''
    }
  },

  props: {
    card: { type: Object, required: true }
  },

  computed: {
    style () { return 'text-align: center;' },
    dataInicio: {
      get () { return this.lDataInicio },
      set (value) {
        this.lDataInicio = value
        if (value > this.lDataTermino) {
          this.dataTermino = value
          if (date.hhmm(this.lHoraTermino) < date.hhmm(this.lHoraInicio)) this.horaTermino = this.lHoraInicio
        }
      }
    },
    dataTermino: {
      get () { return this.lDataTermino },
      set (value) {
        if (value < this.lDataInicio) return this.$app.warn('Data término não pode ser anterior à data início')
        this.lDataTermino = value
      }
    },
    horaInicio: {
      get () { return this.lHoraInicio },
      set (value) {
        this.lHoraInicio = value
        if (value > this.lHoraTermino) this.horaTermino = value
      }
    },
    horaTermino: {
      get () { return this.lHoraTermino },
      set (value) {
        if (value < this.lHoraInicio) return this.$app.warn('Hora término não pode ser anterior à hora início')
        this.lHoraTermino = value
      }
    }
  },

  methods: {
    ...mapActions('Competencia', ['getColaboradores']),
    async executanteFilter (val, update, abort) {
      if (executantes.length === 0) return abort()
      if (val === '') {
        update(() => { this.executanteOptions = executantes })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.executanteOptions = executantes.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    option (o) {
      // usuario cancelou
      if (o === 'cancel') {
        this.$emit('option', { action: 'cancel' })
        return
      }

      // consiste informacoes
      const inicio = date.datetime(this.lDataInicio, this.lHoraInicio)
      const termino = date.datetime(this.lDataTermino, this.lHoraTermino)
      if (inicio === termino) {
        this.$app.error('Início e término estão iguais, deve existir algum intervalo entre as duas.', 0, 'bottom')
        return
      }

      // TODO chamada da api para atualizacao dos dados no backend

      // TODO trata o retorno e possiveis mensagens de consistencia

      // retorna dados atualizados
      this.$refs.dialog.hide()
      this.$emit('option', {
        action: 'ok',
        values: {
          inicio: inicio,
          termino: termino,
          executante_id: this.executante
        }
      })
    }
  },

  async created () {
    this.lDataInicio = this.card.inicio
    this.lHoraInicio = this.card.inicio
    this.lDataTermino = this.card.termino
    this.lHoraTermino = this.card.termino
    await (async () => {
      const result = await this.getColaboradores(this.card.atividade_id)
      // TODO o q fazer se der erro
      if (!result.success) return
      executantes = result.colaboradores
      this.executanteOptions = executantes
      this.executante = this.card.executante_id
      // TODO o q fazer se o executante atual nao existir na lista retornada
    })()
  }
}
</script>

<style lang="stylus" scoped>

.c-dialog
  overflow visible
.c-dialog > div
  margin-left 0px
.c-button
  width 110px
.c-button:focus
  opacity .85
.c-date
  width 32%
  @media (max-width $breakpoint-xs-max)
    width 50%
.c-time
  margin-left 4px
  width 32%
  @media (max-width $breakpoint-xs-max)
    width 45%
.c-select
  width 64% + 1px
  @media (max-width $breakpoint-xs-max)
    width 95% + 1px
</style>
