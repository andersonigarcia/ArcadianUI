<template>
  <div >
    <pessoa-group :completo="true" module="Cliente" state="profissional" ref="pessoaGroup" :pessoaId="pessoaId"/>
    <div class="row q-col-gutter-x-md">
      <q-input v-model="conselhoNumero" type="text" class="col-sm-6 col-grow" label="CRO (0000000000)" mask="#########" stack-label  outlined dense :rules="[]"/>
      <unidade-federativa-select v-model="conselhoUf" label="UF CRO" ref="inputConselhoNumero"/>
    </div>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

export default {
  name: 'ProfissionalGroup',
  mixins: [StateMixin, ValidateMixin],
  props: { pessoaId: { type: String, default: '' } },
  computed: {
    conselhoUf: {
      get () { return this.getState('conselho_uf', this.state) },
      set (value) { this.setState('conselho_uf', value, this.state) }
    },
    conselhoNumero: {
      get () {
        return (this.getState('conselho_numero', this.state) || '').toString()
      },
      set (value) { this.setState('conselho_numero', value || null, this.state) }
    }
  }
}
</script>
