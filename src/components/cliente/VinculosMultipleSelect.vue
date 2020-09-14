<template>
  <div class="row">
    <q-select outlined v-model="model" :label="label" class="col-grow" input-debounce="0" use-input multiple dense options-dense use-chips :options="lOptions" @filter="filter" >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> {{message}} </q-item-section>
          </q-item>
        </template>
    </q-select>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'

export default {
  name: 'VinculosMultipleSelect',
  mixins: [StateMixin],
  props: {
    label: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    message: { type: String, default: 'Nenhum resultado foi encontrado' }
  },
  data () {
    return { lOptions: this.options }
  },
  computed: {
    model: {
      get () {
        let vinculos = this.getState('vinculos', this.state)
        return !vinculos ? null
          : vinculos.map(item => ({ value: item.empresa_id, label: item.empresa_nome }))
      },
      set (value) {
        this.setState('vinculos', value.map(item => ({ empresa_id: item.value, empresa_nome: item.label })))
      }
    }
  },
  methods: {
    filter (value, update) {
      if (value === '') {
        update(() => { this.lOptions = this.options.map(item => ({ value: item.empresa_id, label: item.empresa_nome })) })
        return
      }

      update(() => {
        this.lOptions = this.options.filter(v => v.label.toLowerCase().includes(value))
      })
    }
  }
}
</script>
