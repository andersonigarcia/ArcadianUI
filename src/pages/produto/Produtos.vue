<template>
  <q-page padding>
    <div>
      <q-table class="a-text-dense-ab" dense :data="produtos" :columns="columns" row-key="produto_id" :rows-per-page-options="[]" :pagination.sync="pagination" :loading="loading" :filter="filter" @request="onRequest" >
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td :props="props.produto_id" auto-width>
               <q-btn icon="style" dense size="0.65em" color="brand-3" @click="edit(props.row)"/>
            </q-td>
            <q-td :props="props.categoria_nome">
              <div >{{descricao (props.row)}}</div>
            </q-td>
            <q-td >
               <q-btn icon="delete" class="c-btn-del" :disable="canDelete(props.row.produto_dependentes)" :class="(canDelete(props.row.produto_dependentes) ? 'text-brand-4':'')" dense flat size="0.65em" color="brand-3" @click="exclude(props.row)"/>
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
  name: 'Produto',
  data () {
    return {
      columns: [
        { name: 'produto_id', label: '', field: 'produto_id', align: 'left', sortable: true },
        { name: 'produto_nome', label: 'Nome', field: 'produto_nome', required: true, align: 'left', sortable: true }
      ],
      dados: [],
      deleteId: '',
      dialogVisible: false,
      dialogMessage: '',
      filter: '',
      loading: false,
      pagination: { sortBy: 'produto_nome', descending: false }
    }
  },
  computed: {
    produtos () {
      let filtro = this.filter.toLowerCase()
      if (!filtro) return this.dados
      let result = this.dados.filter(el =>
        el.produto_nome.toLowerCase().includes(filtro) || el.categoria_nome.toLowerCase().includes(filtro)
      )
      return result
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    ...mapActions('Produto', ['getProdutos', 'deletProdutos']),

    canDelete (qtdDependentes) { return qtdDependentes > 0 },
    confirmatioDialog (confirm) {
      if (confirm === 'cancel') { return }
      this[confirm]()
    },
    descricao (item) { return `${item.categoria_nome} : ${item.produto_nome} ` },
    async edit (item) { this.$router.push({ name: 'produto_edit', params: { id: item.produto_id } }) },
    exclude (item) {
      this.dialogVisible = true
      this.deleteId = item.produto_id
      this.dialogMessage = `Confirma a EXCLUSÃO do produto ${item.produto_nome} ?`
    },
    async novo () { this.$router.push({ name: 'produto_new' }) },
    async ok () {
      try {
        this.$q.loading.show()
        let result = await this.deletProdutos(this.deleteId)

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
    async onRequest () {
      this.$nextTick(async function () {
        this.$q.loading.show()
        let result = await (async () => { return this.getProdutos() })()
        if (!result.success) return
        this.dados = result.produtos
        this.pagination.rowsPerPage = this.dados.length
        this.$q.loading.hide()
      })
    }
  }

}
</script>

<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
</style>
