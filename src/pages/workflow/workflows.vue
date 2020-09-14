<template>
  <q-page padding>
    <div>
      <q-table class="a-text-dense-ab" dense :data="workflows" :columns="columns" hide-header row-key="workflow_id" :rows-per-page-options="[]" :pagination.sync="pagination" :loading="loading" :filter="filter" @request="onRequest" >
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td :props="props.workflow_id" auto-width>
               <q-btn icon="vertical_split" dense size="0.65em" color="brand-3" @click="edit(props.row)"/>
            </q-td>
            <q-td :props="props.workflow_nome">
              <div >{{ props.row.workflow_nome }}</div>
            </q-td>
            <q-td >
               <q-btn icon="delete" class="c-btn-del " :disable="canDelete(props.row.workflow_dependentes)" :class="(canDelete(props.row.workflow_dependentes) ? 'text-brand-4':'')"  dense flat size="0.65em" color="brand-3" @click="exclude(props.row)"/>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:top-left>
         <q-btn color="brand-3" size="sm" icon="add" class="q-mr-xs" @click="novo"/>
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
  name: 'Workflow',
  data () {
    return {
      filter: '',
      loading: false,
      dados: [],
      pagination: { sortBy: 'workflow_nome', descending: false },
      columns: [
        { name: 'workflow_id', label: '', field: 'workflow_id', align: 'left', sortable: true },
        { name: 'workflow_nome', label: 'Workflow', field: 'workflow_nome', required: true, align: 'left', sortable: true }
      ],
      dialogVisible: false,
      dialogMessage: '',
      deleteId: ''
    }
  },
  computed: {
    workflows () {
      let filtro = this.filter.toLowerCase()
      if (!filtro) return this.dados
      let result = this.dados.filter((el) => { return el.workflow_nome.toLowerCase().includes(filtro) })
      return result
    }
  },

  methods: {
    ...mapActions('Workflow', ['getWorkflows', 'deletWorkflow']),
    async onRequest (props) {
      try {
        this.$q.loading.show()
        let result = await (async () => { return this.getWorkflows() })()
        if (!result.success) return
        this.dados = result.workflows
        this.pagination.rowsPerPage = this.dados.length
      } finally {
        this.$q.loading.hide()
      }
    },
    canDelete (qtdDependentes) { return qtdDependentes > 0 },
    async novo () { this.$router.push({ name: 'workflow_new' }) },
    async edit (item) { this.$router.push({ name: 'workflow_edit', params: { id: item.workflow_id } }) },
    exclude (item) {
      this.dialogVisible = true
      this.deleteId = item.workflow_id
      this.dialogMessage = `Confirma a EXCLUSÃO de  ${item.workflow_nome} ?`
    },
    confirmatioDialog (confirm) {
      if (confirm === 'cancel') { return }
      this[confirm]()
    },
    async ok () {
      try {
        this.$q.loading.show()
        let result = await this.deletWorkflow(this.deleteId)

        if (result.success) {
          this.$app.ok('Exclusão concluída!', 1000)
          this.onRequest()
        } else {
          this.$app.error(`Erro: ${result.id[0]} `, 1300)
        }
      } catch (error) {
        this.$app.error('Ocorreu um erro inesperado. Tente novamente mais tarde', 1300)
      } finally {
        this.$q.loading.hide()
      }
    }
  },
  mounted () {
    this.onRequest()
  }
}
</script>

<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
</style>
