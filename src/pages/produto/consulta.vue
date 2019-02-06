<template>
  <q-page padding>
    <acoes
      @Cancelar="cancelar"
      titulo="Lista de produtos"
    ></acoes>
    <dropDownList
      propLabel="Categoria de produtos"
      :propLista="lista"
    ></dropDownList>
    <tabelaBase
      :idProduto="keyProduto"
      propTitle="Lista de produtos"
      propDesc:false
      linhaPorPagina:7
    ></tabelaBase>
  </q-page>
</template>

<script>
import dropDownList from "../../components/atomicos/BaseDropdown";
import tabelaBase from "../../components/atomicos/lista";

//Temporário, transformar em um GET para a API
import categorias from "../../Matriz_Dados/xproduto-categorias.json";
import acoes from "../../components/button/paleta-principal";

export default {
  name: "PageProdutos",
  components: {
    dropDownList,
    tabelaBase,
    acoes
  },
  data () {
    return {
      lista: [],
      keyProduto: 25
    };
  },
  methods: {
    cadastrar () {
      //this.$router.push('/cadastrar')
      console.log("...cadastrar");
    },
    cancelar () {
      console.log("...cancelando ação do dialog");
    }
    // async listProdutos () {
    //   this.$q.loading.show()
    //   const data = await this.$store.produtos.dispatch('listProdutos')
    //   this.lista = data && data.produtos ? data.produtos : []
    //   this.configurePagination()
    //   this.$q.loading.hide()
    // }
  }
};
</script>






<!--<template>
  <q-page padding >
    <div class="row-auto justify-around">
      <div class="column" >
        <div class="row-auto">
          <dropdownlist propLabel="categoria de produtos" propSize="md" propColor="primary" :propLista="categoria"> </dropdownlist>
        </div>

        <div  class="row-auto">
          <listitemsimple></listitemsimple>
        </div>
      </div>

    </div>

  </q-page>

</template>-->
