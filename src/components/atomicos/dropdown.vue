<template>
<!-- Propriedades enviadas pelo Pai
  propLabel - texto que será exibido na label da dropdown
  propSize -  Tamanho do botão (Button size. One of xs, sm, md, lg, xl, or a css unit string size eg. 25px, 2rem, 3vw.)
-->
  <div class="q-py-sm" >
    <q-btn-dropdown :size="prop_size" :color="prop_color" :label="prop_label" rounded>
      <q-list link>
        <q-item v-for="row in lista" :key="row.id" v-close-overlay @click.native="selectedItem"  >
          <q-item-main>
            <q-item-tile label>{{ row.texto }}</q-item-tile>
            <q-item-tile sublabel>{{ row.descricao }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    prop_label:{ type: String, default: 'Label não informado.'  },
    prop_size: { type: String, default: 'md' },
    prop_color:{ type: String, default: 'blue-grey-5'  },
    prop_lista: { type: Array }
  },

  methods:{
    atualizarLista(){
      console.log("...atualizar o componente listSimples");
    }
  },
  methods:{
    selectedItem(){
      //this.$eventHub.$on('selecaoProduto', this.)
      console.log("...item selecionado");
    }
  },
  data()  {
      return {
        lista: this.propLista
      }
    }
}

</script>
