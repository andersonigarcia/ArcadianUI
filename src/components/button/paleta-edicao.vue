<template >
    <div class="row .col-12 justify-between blue-grey-6" >

        <div class=".col-2 ">
            <q-btn :class="iconcolor" wait-for-ripple flat dense rounded icon="arrow_back" @click="voltar"/>
        </div>

        <div class=".col-4">
          <h5 class="q-body-4 no-margin uppercase text-weight-bolder" :class="iconcolor" >{{titulo}}</h5>
        </div>

        <div class=".col-4">
          <q-btn :class="iconcolor" wait-for-ripple flat dense rounded icon="add_box" @click="cadastrar" />
          <q-btn :class="iconcolor" wait-for-ripple flat dense rounded icon="save" @click="salvar"/>
          <q-btn :class="iconcolor" wait-for-ripple flat dense rounded icon="delete" @click="deletar"/>
          <q-btn :class="iconcolor" wait-for-ripple flat dense rounded icon="clear" @click="limpar"/>

          <!-- <q-fab color="primary" icon="more_vert" active-icon="remove" direction="down">

            <q-fab-action color="purple" @click="toast('mail')" icon="mail">
              <q-tooltip anchor="center left" self="center right" :offset="[10, 0]"></q-tooltip>
            </q-fab-action>

            <q-fab-action color="secondary" @click="toast('alarm')" icon="alarm">
              <q-tooltip anchor="center left" self="center right" :offset="[10, 0]"></q-tooltip>
            </q-fab-action>

          </q-fab> -->

        </div>
    </div>
</template>

<script>
import { Dialog } from 'quasar'

  export default {
    data () {
      return {
        iconcolor: "text-blue-grey-6"
      };
    },
    methods:{
      cadastrar(){
        this.$router.push('/cadastrar')
      },
      salvar(){
        console.log("...botão salvar")
        this.$q.dialog({
                          title: '  Gravação',
                          message: 'Confirma a gravação do registro?',
                          ok: 'Confirmo',
                          cancel: 'Desisto'
                        }).then(() => {
                          //this.$q.$emit('Confirmar', 'Confirmar ação')
                          this.$q.notify('Gravação confirmada!')
                        }).catch(() => {
                          this.$root.$emit('Cancelar', 'Cancelar ação')
                          this.$q.notify('Gravação cancelada!')
                        })
      },
      avancar(){
        this.$router.push('/cadastrar')
      },
      deletar(){
        console.log("...botão deletar")
        this.$q.dialog({
                          title: 'Deleção',
                          message: 'O item selecionado será deletado definitivamente. Confirma?',
                          ok: 'Confirmo',
                          cancel: 'Desisto'
                        }).then(() => {
                          this.$q.notify('Deleção confirmada!')
                        }).catch(() => {
                          this.$q.notify('Deleção cancelada!')
                        })
      },
      voltar () {
        this.$router.go(-1)
      },
      limpar(){
        this.$q.dialog({
                          title: 'Abandonar',
                          message: 'Deseja abandonar essa página?',
                          ok: 'Confirmo',
                          cancel: 'Desisto'
                        }).then(() => {
                          //this.$q.notify('Deleção confirmada!')
                        }).catch(() => {
                          this.$q.notify('Acabou de desistir!')
                        })
      }
    },
    props:{
        titulo: { type: String, required: true, default: 'Titulo da página' }
        }
  }
</script>

<style></style>
