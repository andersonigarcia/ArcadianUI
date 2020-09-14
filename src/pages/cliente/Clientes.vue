<template>
  <q-page padding>
    <div>
      <q-table class="a-text-dense-ab" dense :data="clientes" :columns="columns" hide-header row-key="cliente_id" :pagination.sync="pagination" :loading="loading" :filter="filter" @request="onRequest" :rows-per-page-options="[]">
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td :props="props.profissional_id || props.empresa_id" auto-width>
              <q-btn :icon="iconPerson(props.row.empresa_id)" dense size="0.65em" color="brand-3" @click="edit(props.row)" title="Editar"/>
            </q-td>
            <q-td :props="props.nome" >
              <div :class="props.row.ativo || 'text-grey-5'">{{ props.row.nome }}</div>
            </q-td>
            <q-td :props="props.contato_fone_a">
              <div class="a-text-caption-sm text-grey-8"> {{ props.row.contato_fone_a || '--' }}</div>
            </q-td>
            <q-td :props="props.contato_nome">
              <div class="a-text-caption-sm">{{ props.row.contato_nome || '--' }}</div>
            </q-td>
            <q-td :props="props.tipo" auto-width >
              <q-icon v-if="isRegisterIncomplete(props.row.tipo)" name="report" color="warning" size="1.4em" title="Cadastro incompleto"/>
            </q-td>
            <q-td >
              <q-btn icon="delete" class="c-btn-del" :disable="canDelete(props.row.cliente_dependentes)" :class="(canDelete(props.row.cliente_dependentes) ? 'text-brand-4':'')" dense flat size="0.65em" color="brand-3" @click="exclude(props.row)" title="Excluir"/>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:top-left>
          <q-btn color="brand-3" size="sm" icon="person_add" @click="novoProfissional" class="q-mr-xs" title="Profissional"/>
          <q-btn color="brand-3" size="sm" icon="group_add" @click="novaClinica" title="Empresa"/>
        </template>

        <template v-slot:top-right="props">
          <q-input borderless dense debounce="100" v-model="filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
      </q-table>
      <confirmation-dialog :visible="dialogVisible" :message="dialogMessage" @option="confirmatioDialog" @hide="dialogVisible = false"/>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Clientes',
  data () {
    return {
      columns: [
        { name: 'cliente_id', label: 'Id', field: 'cliente_id', align: 'left', sortable: true },
        { name: 'cliente_nome', label: 'Cliente', required: true, align: 'left', sortable: true },
        { name: 'contato', label: 'Contato', align: 'left', field: 'contato', sortable: true },
        { name: 'cro_numero', label: 'Número do CRO', align: 'left', field: 'cro_numero', sortable: true },
        { name: 'cadastro_incompleto', label: 'ok', field: 'cadastro_incompleto' }
      ],
      data: [],
      dialogVisible: false,
      dialogMessage: '',
      deleteId: '',
      deleteType: '',
      filter: '',
      loading: false,
      pagination: { sortBy: 'name', descending: false, page: 1, rowsPerPage: 40, rowsNumber: 40 }
    }
  },
  computed: {
    clientes () {
      return this.data
    }
  },
  methods: {
    ...mapActions('Cliente', ['getClientes', 'deletCliente', 'deletProfissional']),
    async onRequest (props) {
      if (props.filter !== undefined && props.filter.length > 0 && props.filter.length < 3) {
        return
      }

      let filter = props.filter ? `&filter=${props.filter}` : ''
      let ret = await (async () => { return this.getClientes(filter) })()

      if (!ret.success) return
      this.data = ret.clientes

      // Atualiza o objeto de paginação
      this.pagination.page = ret.pagination.page
      this.pagination.rowsPerPage = ret.pagination.count
      this.pagination.rowsNumber = ret.pagination.total
      this.$q.loading.hide()
    },
    canDelete (qtdOs) { return qtdOs > 0 },
    isCliente (item) { return !!item.cliente_id },
    isProfissionalNaoCliente (item) { return !this.isCliente(item) && !!item.profissional_id },
    isClienteProfissional (item) { return this.isCliente(item) && !!item.profissional_id },
    isClienteEmpresa (item) { return this.isCliente(item) && !!item.empresa_id },
    iconPerson (empresaId) { return empresaId ? 'people' : 'person' },
    isRegisterIncomplete (tipo) { return tipo.toLowerCase() === 'incompleto' },
    novoProfissional () { this.$router.push({ name: 'profissional_new', params: { tipo: 'profissional', acao: 'cadastrar' } }) },
    novaClinica () { this.$router.push({ name: 'empresa_new', params: { tipo: 'empresa', acao: 'cadastrar' } }) },
    edit (item) {
      if (this.isProfissionalNaoCliente(item)) {
        this.$router.push({ name: 'profissional_edit', params: { id: item.profissional_id, tipo: 'profissional', acao: 'editar', cliente: false } })
      }
      if (this.isClienteProfissional(item)) {
        this.$router.push({ name: 'profissional_edit', params: { id: item.cliente_id, tipo: 'profissional', acao: 'editar', cliente: true } })
      }
      if (this.isClienteEmpresa(item)) { this.$router.push({ name: 'empresa_edit', params: { id: item.cliente_id, tipo: 'empresa', acao: 'editar', cliente: true } }) }
    },
    exclude (item) {
      this.dialogVisible = true
      this.deleteId = item.cliente_id || item.profissional_id
      this.deleteType = item.cliente_id ? 'cliente' : 'profissional'
      this.dialogMessage = `Confirma a EXCLUSÃO do cliente ${item.nome} ?`
    },
    confirmatioDialog (confirm) {
      if (confirm === 'cancel') return
      this[confirm]()
    },
    async ok () {
      this.$q.loading.show()

      let result = ''
      if (this.deleteType.toLowerCase() === 'profissional') {
        result = await this.deletProfissional(this.deleteId)
      } else {
        result = await this.deletCliente(this.deleteId)
      }

      if (result.success) {
        this.$app.ok('Exclusão concluída!', 1000)
        this.onRequest({ pagination: this.pagination, filter: undefined })
      }
    }
  },
  mounted () {
    this.onRequest({ pagination: this.pagination, filter: undefined })
  }
}
</script>

<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
</style>
