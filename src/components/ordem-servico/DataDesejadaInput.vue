<template>
  <div class="row q-col-gutter-md">
    <date-input v-model="dataInicio" label="Data início" class="c-date col-xs-6 col-sm-6" ref="inputDataInicio"/>
    <time-input v-model="horaInicio" label="Hora início" class="c-time col-xs-6 col-sm-6" :hourOptions="local.hours" :rules="[]"/>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'
import { date } from 'quasar'
const { formatDate } = date

export default {
  mixins: [StateMixin],
  data () {
    return {
      local: {
        hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        dataInicio: '',
        horaInicio: ''
      }
    }
  },
  computed: {
    dataInicio: {
      get () { return this.getState('data_desejada') },
      set (value) {
        this.local.dataInicio = this.datetime(value, isNaN(Date.parse(this.horaInicio)) ? value : this.horaInicio) + ':00'
        this.setState('data_desejada', this.local.dataInicio)
      }
    },
    horaInicio: {
      get () { return this.getState('data_desejada') },
      set (value) {
        let last = value.length
        let data = this.local.dataInicio || Date.now()
        this.local.horaInicio = this.datetime(data,
          date.adjustDate(data, { hours: value.substring(last - 5).substring(0, 2), minutes: value.substring(last - 5).substring(3) })
        ) + ':00'
        this.setState('data_desejada', this.local.horaInicio)
      }
    }
  },
  methods: {
    datetime (date, time) { return formatDate(new Date(date), 'YYYY-MM-DD') + 'T' + formatDate(new Date(time), 'HH:mm') }
  }
}
</script>
