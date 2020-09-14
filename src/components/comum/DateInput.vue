<template>
  <q-input :value="date.dmy(value)" @input="typed" :label="label" :input-style="inputStyle" mask="##/##/####" :rules="[val => dateIsValid() || 'Informe uma data válida']" outlined dense stack-label lazy-rules ref="inputData">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="popup">
          <q-date :value="date.ymd(value)" :options="optionsFn()" @input="picked" today-btn first-day-of-week="1"/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import date from 'utils/date'
import inputs from 'utils/input'
import ValidateMixin from 'mixins/comum/validate'
const { isValid, dmy2iso, ymd2iso, ymd } = date

export default {
  name: 'DateInputComponent',
  mixins: [ ValidateMixin ],
  data () { return { lValue: '' } },

  props: {
    label: { type: String, default: 'Data' },
    value: { type: String, default: '' },
    required: { type: Boolean, default: false },
    options: { type: [Array, Function], default: void 0 },
    inputStyle: { type: String, default: '' }
  },

  methods: {
    typed (e) {
      this.lValue = dmy2iso(e) + 'T00:00:00'
      this.$emit('input', this.lValue)
    },
    picked (e) {
      this.lValue = ymd2iso(e) + 'T00:00:00'
      this.$refs.popup.hide()
      this.$emit('input', this.lValue)
    },
    optionsFn (v) { return this.options || (v => v >= ymd(Date.now())) },

    dateIsValid () {
      let clean = inputs.isEmpty(this.lValue)
      if (!this.required && clean) { return true }

      if (isValid(this.lValue)) {
        let ano = ymd(this.lValue).substring(0, 4)
        return ano >= 1900
      }
    }
  },

  created () {
    this.lValue = this.value
    this.date = date
  }
}
</script>
