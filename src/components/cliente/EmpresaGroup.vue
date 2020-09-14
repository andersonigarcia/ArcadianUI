<template>
  <div>
    <div class="row">
      <q-input v-model="razaoSocial" type="text" outlined dense class="col-grow" label="Razão social *" stack-label lazy-rules :rules="[ val => val && val.length > 0  || 'Informe a razão social']" ref="inputRazaoSocial"/>
    </div>
    <div class="row">
      <q-input v-model="nomeFantasia" type="text" outlined dense class="col-grow" label="Nome fantasia *" stack-label lazy-rules :rules="[ val => val && val.length > 0  || 'Informe o nome fantasia']"
        ref="inputNomeFantasia"/>
    </div>
    <div class="row q-col-gutter-x-md">
      <q-input v-model="cnpj" type="text" outlined dense class="col-sm-6 col-grow" label="CNPJ" mask="##.###.###/####-##" stack-label lazy-rules :rules="[val => cnpjCadastrado(val) || '']" :error-message="msgCnpj" ref="inputCnpj"/>

      <q-select class="col-xs-12 col-sm-6 col-grow" label="Responsável pela empresa" v-model="responsavel" :options="options" @filter="filter" use-input dense outlined options-dense
        hide-dropdown-icon hide-selected stack-label input-debounce="0" fill-input hint="Informe as 3 primeiras letras" ref="responsavel">
        <template v-slot:loading></template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <q-card flat bordered class="q-mt-sm">
      <q-card-section>
        <span class="a-text-dense-sm">Dados para Contato/Secretária </span>
      </q-card-section>
      <q-card-section>
        <pessoa-group module="Cliente" state="contato" ref="pessoaGroup"/>
      </q-card-section>
    </q-card>

     <q-card flat bordered class="q-mt-sm" v-if="this.vinculos">
        <profissional-vinculado-group :pessoas="this.vinculos"/>
    </q-card>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import inputs from 'utils/input'

export default {
  name: 'EmpresaGroup',
  mixins: [ValidateMixin, StateMixin],
  data () {
    return {
      options: [],
      errorCnpj: ''
    }
  },
  computed: {
    msgCnpj () { return this.errorCnpj },
    vinculos () { return this.$store.state.Cliente.state ? this.$store.state.Cliente.state.vinculos : [] },
    razaoSocial: {
      get () { return this.getState('razao_social') },
      set (value) { this.setState('razao_social', value || null) }
    },
    nomeFantasia: {
      get () { return this.getState('nome') },
      set (value) { this.setState('nome', value || null) }
    },
    cnpj: {
      get () { return this.getState('cnpj') },
      set (value) { this.setState('cnpj', value || null) }
    },
    responsavel: {
      get () { return this.getState('responsavel_nome') || '' },
      set (value) {
        this.setState('responsavel_id', value.id)
        this.setState('responsavel_nome', value.label || null)
      }
    },
    empresaId () { return this.getState('empresa_id', 'cliente') }
  },
  methods: {
    ...mapActions('Cliente', ['getEmpresaFind', 'getPessoasFind']),

    cnpjCadastrado (value) { return this.existeCpnj(value) },
    async existeCpnj (value) {
      if (inputs.isEmpty(value)) return true

      if (!inputs.validateCNPJ(value)) {
        this.errorCnpj = 'CNPJ inválido'
        return false
      }
      return true
    },
    filter (text, update) {
      if (!!text && text.length >= 3) {
        update(() => { this.PesquisarPessoa(text) })
      }
    },
    async PesquisarPessoa (texto) {
      this.data = await this.getPessoasFind(texto)
      if (!this.data.success) return
      this.options = this.data.pessoas.map(pessoa => ({ id: pessoa.pessoa_id, label: pessoa.pessoa_nome }))
    }
  }
}
</script>
