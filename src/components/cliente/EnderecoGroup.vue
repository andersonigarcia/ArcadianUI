<template>
  <div>
    <div class="row q-col-gutter-x-md">
      <q-input v-model="cep" type="text" outlined dense class="col-sm-3 col-grow" label="CEP" mask="#####-###" stack-label lazy-rules :rules="[ val => (val === undefined || isValidCep(val))  || 'Informe o CEP válido']" ref="inputCep" @blur="getCep"/>
      <q-input v-model="logradouro" type="text" outlined dense class="col-sm-9 col-grow" label="Logradouro" stack-label :rules="[]" ref="inputLogradouro"/>
    </div>
    <div class="row q-col-gutter-x-md">
      <q-input v-model="numero" type="text" outlined dense class="col-sm-3 col-grow" label="Número" mask="#########" stack-label :rules="[]"  ref="inputNumero"/>
      <q-input v-model="complemento" type="text" outlined dense class="col-sm-9 col-grow" label="Complemento" stack-label :rules="[]" ref="inputComplemento"/>
    </div>

    <div class="row q-col-gutter-x-md">
      <q-input v-model="bairro" type="text" outlined dense class="col-sm-6 col-grow" label="Bairro" stack-label  :rules="[]" ref="inputBairro"/>
      <q-input v-model="cidade" type="text" outlined dense class="col-sm-6 col-grow" label="Cidade" stack-label :rules="[]" ref="inputCidade"/>
    </div>

    <div class="row q-col-gutter-x-md">
      <unidade-federativa-select  v-model="unidade_federacao" label="UF"/>
      <q-input v-model="referencia" type="text" outlined dense class="col-sm-6 col-grow" label="Referência" stack-label :rules="[]"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import inputs from 'utils/input'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

export default {
  name: 'EnderecoGroup',
  mixins: [ValidateMixin, StateMixin],
  data () {
    return {
      endereco: ''
    }
  },
  computed: {
    bairro: {
      get () { return this.getState('bairro') },
      set (value) { this.setState('bairro', value || null) }
    },
    cep: {
      get () { return this.getState('cep') },
      set (value) { this.setState('cep', value || null) }
    },
    cidade: {
      get () { return this.getState('cidade') },
      set (value) { this.setState('cidade', value || null) }
    },
    complemento: {
      get () { return this.getState('complemento') },
      set (value) { this.setState('complemento', value || null) }
    },
    logradouro: {
      get () { return this.getState('logradouro') },
      set (value) { this.setState('logradouro', value || null) }
    },
    numero: {
      get () { return this.getState('numero') },
      set (value) { this.setState('numero', value || null) }
    },
    referencia: {
      get () { return this.getState('referencia') },
      set (value) { this.setState('referencia', value || null) }
    },
    unidade_federacao: {
      get () { return this.getState('unidade_federacao') },
      set (value) { this.setState('unidade_federacao', value) }
    }
  },
  methods: {
    ...mapActions('Cliente', ['getEnderecoCep']),

    isValidCep (cep) { return inputs.IsCEP(cep) },

    async getCep () {
      let inputCep = this.$refs.inputCep
      if (!inputCep.value || this.cep === this.$store.state.Cliente.original.Correspondencia.cep) { return }

      this.clearCep()

      await (async () => {
        let result = this.ajustPropiesCep(await this.getEnderecoCep(inputCep.value))

        if (result.erro) {
          this.$app.warn('Cep não encontrado.', 1200)
          this.$refs.inputCep.error = true
          return
        }
        this.$store.commit(`${this.module}/SET_STATE_COMPONENT`, { state: this.state, data: result })
      })()
    },

    ajustPropiesCep (objCep) {
      objCep.unidade_federacao = objCep.uf
      objCep.localidade = objCep.cidade
      delete objCep.uf
      delete objCep.cidade
      delete objCep.gia
      return objCep
    },

    clearCep () {
      this.logradouro = null
      this.numero = null
      this.bairro = null
      this.cidade = null
      this.unidade_federacao = null
      this.referencia = null
      this.complemento = null
    }
  }
}
</script>
