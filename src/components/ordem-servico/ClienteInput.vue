<template>
  <div class="row" >
    <q-select class="col-xs-12 col-sm-12" label="Cliente *" :readonly="!enableCliente" v-model.lazy="nomeCliente" :options="options" @filter="filterFn" use-input dense outlined options-dense hide-dropdown-icon hide-selected fill-input stack-label input-debounce="0" option-disable="true" :rules="[ val => val !== '' || 'Selecione um cliente']"  @click.native="edicao" ref="input">
      <template v-slot:no-option>
        <q-item>
          <q-item-section >Nenhum resultado foi encontrado</q-item-section>
        </q-item>
      </template>
      <template v-slot:loading></template>
    </q-select>
    <q-btn :class="this.$q.screen.lt.md? 'c-add-btn' : 'c-add-btn-md'" color="grey-7" size="md" icon="description" round dense flat to="/HistoricoCliente"/>
    <confirmation-dialog :visible="dialogVisible" :message="dialogMessage" @option="confirmatioDialog" />
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import { mapActions } from 'vuex'

export default {
  name: 'ClienteInput',
  mixins: [StateMixin, ValidateMixin],
  data () {
    return {
      dialogVisible: false,
      dialogMessage: 'A alteração do cliente NÃO fará o recalculo financeiro automático do pedido. Prosseguir com a alteração?',
      options: []
    }
  },
  computed: {
    enableCliente: {
      get () { return this.getState('editInputCliente') },
      set (value) {
        this.setState('editInputCliente', value)
      }
    },
    nomeCliente: {
      get () { return this.getState('cliente_nome') },
      set (value) {
        this.setState('cliente_id', value.id)
        this.setState('cliente_nome', value.label)
      }
    },
    osTag () { return this.getState('os_tag') }
  },
  created () { this.enableCliente = false },
  mounted () {
    if (this.osTag) {
      this.$refs.input.inputValue = this.nomeCliente
    }
  },
  methods: {
    ...mapActions('Cliente', ['getClientesFind']),

    cancel () {
      this.dialogVisible = false
      this.enableCliente = false
    },
    confirmatioDialog (confirm) { this[confirm]() },
    edicao () {
      if (this.enableCliente) { return }
      this.dialogVisible = true
    },
    filterFn (val, update) {
      if (val.length >= 3) {
        update(() => { this.PesquisarCliente(val) })
      }
    },
    ok () {
      this.dialogVisible = false
      this.enableCliente = true
    },
    async PesquisarCliente (texto) {
      this.data = await this.getClientesFind(texto)
      if (!this.data.success) return
      let clientesMap = this.data.clientes.map(cliente => ({ id: cliente.cliente_id, label: cliente.cliente_nome }))
      this.options = Array.from(clientesMap)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .c-add-btn {
    margin-top: -55px
    margin-left : 88%
  }
  .c-add-btn-md {
    margin-top: -55px
    margin-left : 94.5%
  }
</style>
