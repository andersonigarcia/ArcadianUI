<template>
  <div >
    <q-card square color="blue-grey-6">
      <app-info-usuario :nome="nomeUsuario" :cargo="cargo"></app-info-usuario>

      <q-card-actions horizontal class="justify-between">
          <app-Home></app-Home>
          <app-tarefas></app-tarefas>
          <app-tarefas-atrasadas></app-tarefas-atrasadas>
          <app-fatura-mes></app-fatura-mes>
          <app-mensagem-usuario></app-mensagem-usuario>
          <app-sair></app-sair>
      </q-card-actions>
    </q-card>

  </div>
</template>

<style> </style>

<script>
import appHome from '../button/app-home'
import appTarefas from "../button/usuario-tarefas";
import appTarefasAtrasadas from "../button/usuario-tarefas-atrasadas";
import appFaturaMes from "../button/usuario-fatura-mes";
import appMensagemUsuario from "../button/usuario-notificacoes";
import appSair from "../button/app-sair";
import appInfoUsuario from "../card/usuario-logado";

  export default{
    components:{
      appHome,
      appTarefas,
      appTarefasAtrasadas,
      appFaturaMes,
      appMensagemUsuario,
      appSair,
      appInfoUsuario
    },
    data(){
      return{
        nomeUsuario: "Marcos Antonio Silva",
        cargo: "Impressor 3D"
      }
    }
   }
</script>
