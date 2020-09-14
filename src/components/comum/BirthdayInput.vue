<template>
  <div>
    <q-input v-model="lValue" @input="typed" :label="label" :disabled="disabled" fill-mask mask="## /##" stack-label outlined  class="col-sm-2 col-grow"  dense />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: 'Aniversário' },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },
  data () {
    return {
      lValue: ''
    }
  },
  methods: {
    typed (val) {
      this.$emit('input', this.format(val))
    },
    format (val) {
      let values = val.replace(/_/gi, '').split('/')

      let d = values[0]
      if (d > 31) { d = 31 }

      let m = values[1]
      if (m !== '' && m > 12) { m = 12 }

      return `${d}/${m}`
    }
  }

}
</script>
