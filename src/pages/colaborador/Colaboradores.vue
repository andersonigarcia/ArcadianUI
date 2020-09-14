<template>
  <q-page padding>
    <div>
      <q-table class="a-text-dense-ab" dense :data="colaboradores" :columns="columns" hide-header row-key="colaborador_id" :rows-per-page-options="[]" :pagination.sync="pagination" :loading="loading" :filter="filter" @request="onRequest" >
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td :props="props.colaborador_id"  >
               <q-btn icon="assignment_ind" dense size="0.65em" color="brand-3" @click="edit(props.row)"/>
            </q-td>
            <q-td :props="props.colaborador_nome" >
              <div >{{props.row.colaborador_nome}}</div>
            </q-td>
            <q-td >
               <q-btn class="c-btn-del" icon="delete" dense flat size="0.65em" color="brand-3" @click="exclude(props.row)"/>
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
  name: 'Colaborador',
  data () {
    return {
      filter: '',
      loading: false,
      dados: [],
      pagination: { sortBy: 'colaborador_nome', descending: false },
      columns: [
        { name: 'colaborador_id', label: '', field: 'colaborador_id', align: 'left', sortable: true },
        { name: 'colaborador_nome', label: 'Nome', field: 'colaborador_nome', required: true, align: 'left', sortable: true }
      ],
      dialogVisible: false,
      dialogMessage: '',
      deleteId: ''
    }
  },
  computed: {
    colaboradores () {
      let filtro = this.filter.toLowerCase()
      if (!filtro) return this.dados
      let result = this.dados.filter(el => el.colaborador_nome.toLowerCase().includes(filtro))
      return result
    }
  },

  methods: {
    ...mapActions('Colaborador', ['getColaboradores', 'deletColaborador']),
    async novo () { this.$router.push({ name: 'cadastrar_new' }) },
    async edit (item) { this.$router.push({ name: 'colaborador_edit', params: { id: item.colaborador_id } }) },

    exclude (item) {
      this.dialogVisible = true
      this.deleteId = item.colaborador_id
      this.dialogMessage = `Confirma a EXCLUSÃO do colaborador ${item.colaborador_nome} ?`
    },

    confirmatioDialog (confirm) {
      if (confirm === 'cancel') { return }
      this[confirm]()
    },

    async ok () {
      try {
        this.$q.loading.show()
        let result = await this.deletColaborador(this.deleteId)

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
    },
    async onRequest (props) {
      try {
        this.$q.loading.show()
        let result = await this.getColaboradores()
        if (!result.success) return
        this.dados = result.colaboradores
        this.pagination.rowsPerPage = this.dados.length
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
