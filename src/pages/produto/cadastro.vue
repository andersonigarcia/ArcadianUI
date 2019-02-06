<template>
  <q-page padding>
    <div class=".col-10 justify-center">
      <acoes titulo="Cadastro de produto"></acoes>

      <div>
        <dropDownList
          propSize="md"
          propLabel="Categoria de produtos"
          :propLista="lista"
        ></dropDownList>
      </div>

      <div>
        <q-field helper="Produto(s) que será(ão) incluído(s) nessa categoria">
          <q-chips-input
            float-label="Nome do produto"
            v-model="nome"
          />
        </q-field>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import dropDownList from "../../components/atomicos/BaseDropdown";
import acoes from "../../components/button/paleta-principal";
import categorias from "../../Matriz_Dados/xproduto-categorias.json"; //Temporário, transformar em um GET para a API

//var cadastroProdutoBus = new vue;
export const EventBus = new Vue();

export default {
  components: {
    dropDownList,
    acoes
  },
  data () {
    return {
      lista: categorias,
      nome: []
    };
  },
  methods: {
    cancelar () {
      //this.EventBus.$emit("eventoCancelar", "0");

      //console.log("...cancelando ação do dialog")
      console.alert("...cancelando ação do dialog");
    }
  }
};
</script>

<style></style>
