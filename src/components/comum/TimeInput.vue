<template>
  <q-input :value="hhmm(value)" @input="typed" :label="label" :input-style="inputStyle" mask="time" :rules="rules" outlined dense stack-label>
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy ref="popup">
          <q-time :value="hhmm(value)" @input="picked" :minute-options="minuteOptions" :hour-options="hourOptions" format24h/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import date from 'utils/date'

export default {
  data () { return { lValue: '', lDate: '' } },

  props: {
    label: { type: String, default: 'Hora' },
    value: { type: String, default: '' },
    rules: { type: Array, default: void 0 },
    hourOptions: { type: Array, default: void 0 },
    minuteOptions: { type: Array, default: () => [0, 10, 20, 30, 40, 50] },
    inputStyle: { type: String, default: '' }
  },

  methods: {
    hhmm: date.hhmm,
    typed (e) {
      this.lValue = this.lDate + e
      this.$emit('input', this.lValue)
    },
    picked (e) {
      this.lValue = this.lDate + e
      this.$refs.popup.hide()
      this.$emit('input', this.lValue)
    }
  },

  created () {
    this.lDate = date.isoDate(this.value || Date(), 'YYYY-MM-DD') + 'T'
    this.lValue = this.value
  }
}
</script>
