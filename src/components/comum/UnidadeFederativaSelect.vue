<template>
  <q-select
    :value="uf"
    :label="label"
    :options="options"
    @input="selected"
    @filter="filter"
    :rules="[]"
    class="col-sm-6 col-grow c-dialog"
    use-input
    dense
    outlined
    stack-label
    input-debounce="0"
    options-dense
    ref="inputUF"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">Nenhum resultado encontrado</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>

const unidadesFederativas = [
  { value: '', label: '' },
  { value: 'AC', label: 'AC - Acre' },
  { value: 'AL', label: 'AL - Alagoas' },
  { value: 'AM', label: 'AM - Amazonas' },
  { value: 'AP', label: 'AP - Amapá' },
  { value: 'BA', label: 'BA - Bahia' },
  { value: 'CE', label: 'CE - Ceará' },
  { value: 'DF', label: 'DF - Distrito Federal' },
  { value: 'ES', label: 'ES - Espírito Santo' },
  { value: 'GO', label: 'GO - Goiás' },
  { value: 'MA', label: 'MA - Maranhão' },
  { value: 'MG', label: 'MG - Minas Gerais' },
  { value: 'MS', label: 'MS - Mato Grosso do Sul' },
  { value: 'MT', label: 'MT - Mato Grosso' },
  { value: 'PA', label: 'PA - Pará' },
  { value: 'PB', label: 'PB - Paraíba' },
  { value: 'PE', label: 'PE - Pernambuco' },
  { value: 'PI', label: 'PI - Piauí' },
  { value: 'PR', label: 'PR - Paraná' },
  { value: 'RJ', label: 'RJ - Rio de Janeiro' },
  { value: 'RN', label: 'RN - Rio Grande do Norte' },
  { value: 'RO', label: 'RO - Rondônia' },
  { value: 'RR', label: 'RR - Roraima' },
  { value: 'RS', label: 'RS - Rio Grande do Sul' },
  { value: 'SC', label: 'SC - Santa Catarina' },
  { value: 'SE', label: 'SE - Sergipe' },
  { value: 'SP', label: 'SP - São Paulo' },
  { value: 'TO', label: 'TO - Tocantins' }]

export default {
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' }
  },

  data () {
    return { options: unidadesFederativas }
  },

  methods: {
    filter (text, update) {
      if (text === '') {
        update(() => { this.options = unidadesFederativas })
        return
      }
      update(() => {
        this.options = unidadesFederativas.filter(v => v.value.toLowerCase().includes(text) || v.label.toLowerCase().includes(text))
      })
    },

    item () {
      return unidadesFederativas.find(val => val.value === this.value) || {}
    },

    selected (obj) {
      this.$emit('input', obj.value)
    }
  },
  computed: {
    uf () {
      return this.item()
    }
  }
}

</script>

<style lang="stylus" scoped>

  .c-dialog {
    overflow: visible;
  }
</style>
