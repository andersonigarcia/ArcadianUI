<template>
<!-- Propriedades enviadas pelo Pai
  propLabel - texto que será exibido na label da dropdown
  propSize -  Tamanho do botão (Button size. One of xs, sm, md, lg, xl, or a css unit string size eg. 25px, 2rem, 3vw.)
-->
  <div class="q-py-sm">
    <q-btn-dropdown
      :size="propSize"
      :color="propColor"
      :label="propLabel"
      push >

      <q-list link>
        <q-item v-for="row in lista" :key="row.id" v-close-overlay @click.native="selectedItem"  >
          <q-item-side :icon="row.icon" :inverted="row.invert" :color="row.cor" />
          <q-item-main>
            <q-item-tile label>{{ row.texto }}</q-item-tile>
            <q-item-tile sublabel>{{ row.descricao }}</q-item-tile>
          </q-item-main>
          <q-item-side right icon="edit" color="light" />
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  //name: "dropDownList",
  props: {
    propLabel:{ type: String, default: 'Label não informado.'  },
    propSize: { type: String, default: 'md' },
    propColor:{ type: String, default: 'primary'  },
    propLista: { type: Array }
  },

  methods:{
    atualizarLista(){
      console.log("...atualizar o componente listSimples");
    }
  },
  methods:{
    selectedItem(){
      //this.$eventHub.$on('selecaoProduto', this.)
    }
  },

  data()  {
      return {
        lista: this.propLista
      }
    }
}

</script>
