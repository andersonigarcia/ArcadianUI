<template>
 <div >
    <q-table
      :filter="filter"
      :title="propTitle"
      :data="tableData"
      :columns="columns"
      :visible-columns="visibleColumns"
      no-data-label = "Nenhum dado encontrado"
      no-results-label = "Nenhum dado encontrado para o filtro"
      loading-label = "Aguarde..."
      rows-per-page-label = "Linhas por página"
      :pagination.sync = "paginacao"
      :separator="separator"
      color="secondary"
      dense >

      <!--Filtro -->
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6" />
      </template>

      <template slot="bottom-right" slot-scope="props" >
        <!-- Suprimir colunas -->
        <q-table-columns color="secondary" class="q-mr-sm" v-model="visibleColumns" :columns="columns" />

        <!--Full screen -->
        <q-btn flat round dense  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"  @click="props.toggleFullscreen" color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>

//Sunstituir pelo json de retorno retornado da API
import dados from '../../Matriz_Dados/produtos.json'
import colunas from '../../Matriz_Dados/produto-colunas-grid.json'
// import acoes from '../../components/button/paleta-basica'

export default {

  props:{
    propTitle: { type: String, default: 'Tabela base' },
    propDesc: { type: Boolean, default: false },
    linhaPorPagina:{ type: Number, default: 10 }
  },
  components:{
    // acoes
  },

  data: () => ({
    name: "tabelaBase",
    filter: '',
    terms: dados,
    columns: colunas,
    tableData: dados,
    paginacao: {
      sortBy: "id",
       descending: false,
      // page: 1,
      rowsPerPage: 10
    },
    visibleColumns: colunas,
    separator: 'horizontal'
  }),
  methods:{
    adicionar(){
      console.log("...adiconar novo item no grid")
    },
    deletar(){
      console.log("...deletar item do grid")
    }
  }

}
</script>
