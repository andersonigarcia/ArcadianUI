<template>
  <div>
    <profissional-group module="Cliente" state="profissional" ref="profissionalGroup" :pessoaId="pessoaId"/>

    <q-checkbox class="a-text-dense-xs q-mr-md" v-model="pedidoCliente" color="secondary" label="Este profissional realiza pedidos diretamente ao laboratório" dense @input="checkProfissional"/>

    <q-card v-if="!!pedidoCliente" flat bordered class="q-mt-sm">
      <q-card-section>
        <span class="a-text-dense-sm">Dados para Contato/Secretária</span>
      </q-card-section>
      <q-card-section>
        <pessoa-group module="Cliente" state="contato" ref="pessoaGroup" :pessoaId="pessoaId"/>
      </q-card-section>
    </q-card>

    <q-checkbox class="a-text-dense-xs" v-model="pedidoClinica" color="secondary" label="Este profissional realiza pedidos através de clínicas" dense @input="checkClinica"/>

    <q-card v-if="!!pedidoClinica" flat bordered class="q-mt-sm">
      <q-card-section>
        <span class="a-text-dense-sm" >Selecione a(s) clinica(s) associada(s):</span>
      </q-card-section>
      <q-card-section>
        <vinculos-multiple-select module="Cliente" state="vinculos" :options="options"  z-top />
      </q-card-section>
    </q-card>
    <div v-if="!(!!pedidoClinica || !!pedidoCliente)">
      <span class="row q-mt-md .text-weight-regular text-caption text-italic ">Para que este profissional realize pedidos é necessário marcar pelo menos uma opção.</span>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

export default {
  name: 'ProfissionalForm',
  mixins: [StateMixin, ValidateMixin],
  props: {
    pessoaId: { type: String, default: '' }
  },
  data () {
    return {
      options: []
    }
  },
  computed: {
    stateProfissional () { return this.$store.state.Cliente.state },
    pedidoCliente: {
      get () {
        return !!this.getState('pedidoCliente', 'screen')
      },
      set (value) { this.setState('pedidoCliente', value, 'screen') }
    },
    pedidoClinica: {
      get () {
        return this.getState('pedidoClinica', 'screen')
      },
      set (value) { this.setState('pedidoClinica', value, 'screen') }
    }
  },
  async created () {
    let result = await this.getClientesEmpresas()
    if (result.empresas) { this.options = result.empresas }
  },
  methods: {
    ...mapActions('Cliente', ['getClientesEmpresas']),
    checkClinica () {
      if (!this.pedidoClinica) { this.$store.commit(`${this.module}/DELETE_STATE`, { state: 'empresa', data: {} }) }
    },
    checkProfissional () {
      if (!this.pedidoCliente) { this.$store.commit(`${this.module}/DELETE_STATE`, { state: 'contato', data: {} }) }
    }
  }
}
</script>
