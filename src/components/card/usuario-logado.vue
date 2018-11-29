<template>
  <div>
    <q-item>
        <q-item-side avatar="/statics/boy-avatar.jpg" />
        <q-item-main>
          <q-item-tile label>{{ nome }}</q-item-tile>
          <q-item-tile color="blue-grey-3" sublabel>{{ cargo }}</q-item-tile>
        </q-item-main>
      </q-item>
  </div>
</template>

<style> </style>

<script>
export default {
  data (){
      return{
        mesagem:'Nenhuma mensagem encontrada',
        showing: false
      }
    },
  props:{
      nome: {type: String, required: true, default: 'Usuário logado'},
      cargo: {type: String, required: true, default: 'Cargo do usuário'}
    }
}
</script>

