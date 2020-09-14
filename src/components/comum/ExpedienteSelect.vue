<template>
  <q-select
    :value="dia"
    :label="label"
    :options="options"
    @input="selected"
    @filter="filter"
    :rules= rules
    :readonly="readonly"
    class="col col-grow c-dialog"
    use-input
    dense
    outlined
    stack-label
    input-debounce="0"
    options-dense
    ref="inputDiaSemana"
    hide-bottom-space
    hide-dropdown-icon
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">Nenhum resultado encontrado</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>

const diasSemana = [
  { value: '', label: 'De segunda a sexta-feira - 8hs às 18hs com 2hs de intervalo' }
]

export default {
  props: {
    value: { type: String, default: '1' },
    label: { type: String, default: '' },
    rules: { type: Array, default: void 0 },
    readonly: { type: Boolean, default: false }
  },
  data () { return { options: diasSemana } },
  methods: {
    filter (text, update) {
      if (text === '') {
        update(() => { this.options = diasSemana })
        return
      }
      update(() => {
        this.options = diasSemana.filter(v => v.value.toLowerCase().includes(text) || v.label.toLowerCase().includes(text))
      })
    },
    item () { return diasSemana.find(val => val.value === this.value) || {} },
    selected (obj) { this.$emit('input', obj.value) }
  },
  computed: {
    dia () { return this.item() }
  }
}
</script>

<style lang="stylus" scoped>
  .c-dialog {
    overflow: visible;
  }
</style>
