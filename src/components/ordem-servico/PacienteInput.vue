<template>
  <div>
    <q-select class="col-xs-12 col-sm-12" label="Paciente *"  v-model.lazy="nome" input-debounce="0" :options="options" @filter="filterFn" use-input dense outlined options-dense hide-dropdown-icon hide-selected fill-input stack-label :rules="[val => val !== '' || 'Selecione um paciente']" ref="input">
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">Nenhum resultado foi encontrado...</q-item-section>
        </q-item>
      </template>
      <template v-slot:append>
        <q-item>
          <q-btn class="c-margin-btn" icon="description" color="grey-7" size="md" title="Detalhes do paciente" round dense flat to="/HistoricoPaciente"/>
        </q-item>
      </template>
      <!-- Remove o spinner de atualização -->
      <template v-slot:loading></template>
    </q-select>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'

export default {
  mixins: [StateMixin, ValidateMixin],
  data () {
    return { options: [] }
  },
  computed: {
    nome: {
      get () { return this.getState('paciente_nome') },
      set (value) {
        this.setState('paciente_id', value.id)
        this.setState('paciente_nome', value.label)
      }
    },
    osTag () { return this.getState('os_tag') }
  },
  mounted () {
    if (this.osTag) {
      this.$refs.input.inputValue = this.nome
    }
  },
  methods: {
    ...mapActions('Pessoa', ['getPessoasFind']),

    filterFn (val, update, abort) {
      if (val.length >= 3) {
        update(() => { this.PesquisarPaciente(val) })
      }
    },
    async PesquisarPaciente (texto, done) {
      let ret = await this.getPessoasFind(texto)
      if (!ret.success) return
      let pacientesMap = ret.pessoas.map(pessoa => ({
        id: pessoa.pessoa_id, descricao: pessoa.pessoa_nome, label: pessoa.pessoa_nome
      }))
      this.options = Array.from(pacientesMap)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .c-margin-btn {
    margin-right: -25px;
    }
</style>
