<template>
  <div>
    <div class="row ">
      <q-input v-model="nome" type="text" outlined dense class="col-grow " label="Nome *" stack-label lazy-rules :rules="[ val => val && val.length > 3  || 'Nome não informado ou inválido']" ref="inputNome"/>
    </div>
    <div v-if="completo" class="row q-col-gutter-x-md">
      <q-input v-model="cpf" type="text" outlined dense class="col-sm-6 col-grow" label="CPF (000.000.000-00)" mask="###.###.###-##" lazy-rules stack-label :rules="[val => cpfCadastrado(val) || '' ]" ref="inputCpf" :error-message="msgCpf"/>
      <date-input v-model="dataNascimento" class="col-sm-6 col-grow" label="Data de nascimento (00/00/0000)" ref="inputDataNascimento"/>
    </div>

    <div class="row q-col-gutter-x-md">
      <q-input v-model="telCelular" type="text" outlined dense class="col-sm-6 col-grow" label="Telefone celular (DD 0000 - 0000)" mask="(##) ##### - ####"  stack-label :rules="[val => (isEmpty(val) || val.length > 15) || 'Telefone Inválido']" ref="inputCelular"/>
      <q-input v-model="telFixo" type="text" outlined dense class="col-sm-6 col-grow " label="Telefone fixo (DD 0000 - 0000)" mask="(##) #### - ####" stack-label :rules="[val => (isEmpty(val) || val.length > 15) || 'Telefone Inválido']" ref="inputFixo"/>
    </div>

    <div class="row q-col-gutter-x-md">
      <q-input v-model="email" type="email" outlined dense class="col-grow " label="Email" stack-label :rules="[val => (validateEmail(val) )|| 'Email incorreto' ]" ref="inputEmail">
      </q-input>
    </div>
  </div>
</template>

<script>
import inputs from 'utils/input'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import { mapActions } from 'vuex'

export default {
  name: 'PessoaGroup',
  mixins: [ValidateMixin, StateMixin],
  props: {
    completo: { type: Boolean, default: false }
  },
  data () {
    return {
      errorCpf: '',
      dateValid: true
    }
  },
  computed: {
    cpf: {
      get () { return this.getState('cpf', this.state) },
      set (value) { this.setState('cpf', value || null, this.state) }
    },
    dataNascimento: {
      get () { return this.getState('data_nascimento', this.state) },
      set (value) { this.setState('data_nascimento', value, this.state) }
    },
    email: {
      get () { return this.getState('email', this.state) },
      set (value) { this.setState('email', value || null, this.state) }
    },
    msgCpf () { return this.errorCpf },
    nome: {
      get () { return this.getState('nome', this.state) },
      set (value) { this.setState('nome', value || null, this.state) }
    },
    telCelular: {
      get () { return this.getState('fone_a', this.state) },
      set (value) { this.setState('fone_a', value || null, this.state) }
    },
    telFixo: {
      get () { return this.getState('fone_b', this.state) },
      set (value) { this.setState('fone_b', value || null, this.state) }
    }
  },

  methods: {
    ...mapActions('Cliente', ['getPessoasFind']),

    cpfCadastrado (value) { return this.cpfValido(value) },
    async cpfValido (value) {
      if (!inputs.isEmpty(value) && inputs.validateCPF(value)) { return true }

      this.errorCpf = 'CPF inválido'
      return false
    },
    isEmpty (val) { return inputs.isEmpty(val) },
    validateEmail (email) { return inputs.validateEmail(email) }
  }
}
</script>
