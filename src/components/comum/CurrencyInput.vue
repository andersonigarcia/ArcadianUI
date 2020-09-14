<template>
  <q-input
    stack-label
    outlined
    dense
    :label="label"
    :readonly="readonly"
    :disable="disable"
    :maxlength="maxlength"
    :rules="rules"
    :input-class="inputClass"
    input-style="text-align:right"
    ref="input"
    v-model="localValue"
    v-money="moneyConfig"
  />
</template>

<script>
import { VMoney } from 'v-money'

export default {
  name: 'Currency',
  directives: { money: VMoney },
  props: {
    value: { type: String, default: '0' },
    precision: { type: Number, default: 2 },
    maxlength: { type: Number, default: 7 },
    label: { type: String, default: 'R$ ' },
    readonly: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    inputClass: { type: String, default: '' },
    rules: { type: Array }
  },
  data () {
    return {
      moneyConfig: {
        decimal: ',',
        thousands: '.',
        precision: this.precision,
        masked: false
      }
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    setInputValue (v) {
      this.$refs.input.$refs.input.value = v
    }
  }
}
</script>
