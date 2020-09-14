<template>
  <div >
    <q-checkbox v-if="pedidoCliente" v-model="isEnderecoEntrega" class="a-text-dense-xs" color="secondary" label="Endereço de entrega diferente do endereço de correspondência" @input="checkEntrega"/>
    <q-card flat bordered>
      <q-card-section>
        <span class="a-text-dense-sm">Endereço de correspondência</span>
      </q-card-section>
      <q-card-section>
        <endereco-group module="Cliente" state="Correspondencia" ref="Correspondencia"/>
      </q-card-section>
    </q-card>

    <q-card v-if="isEnderecoEntrega" flat bordered class="q-mt-sm">
      <q-card-section>
        <span class="a-text-dense-sm">Endereço de entrega</span>
      </q-card-section>
      <q-card-section>
        <endereco-group module="Cliente" state="Entrega" ref="Entrega"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

export default {
  name: 'ProfissionalForm',
  mixins: [StateMixin, ValidateMixin],
  props: { pedidoCliente: { type: Boolean, default: true } },
  computed: {
    isEnderecoEntrega: {
      get () { return this.getState('isEnderecoEntrega') || !!this.$store.state.Cliente.state.Entrega },
      set (value) { this.setState('isEnderecoEntrega', value) }
    }
  },
  methods: {
    checkEntrega (value) {
      if (!this.isEnderecoEntrega) { this.$store.commit(`${this.module}/DELETE_STATE`, { state: 'endereco', son: 'Entrega', data: {} }) }
    }
  }
}
</script>
