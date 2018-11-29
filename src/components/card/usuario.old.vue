<template>
  <div >
    <q-card square color="blue-grey-6">
      <q-item>
        <q-item-side avatar="/statics/boy-avatar.jpg" />
        <q-item-main>
          <q-item-tile label>{{ nome }}</q-item-tile>
          <q-item-tile color="blue-grey-3" sublabel>{{ cargo }}</q-item-tile>
        </q-item-main>
      </q-item>

      <q-card-actions horizontal class="justify-between">
          <app-botao prop_id="Cancelar" prop_size="md" prop_icon="home" prop_title="home" prop_disabled prop_event_emitido="PaginaInicial" @PaginaInicial='PaginaInicial'></app-botao>
          <app-botao prop_id="Tarefas" prop_size="md" prop_icon="assignment" prop_title="Tarefas" prop_disabled prop_event_emitido="ExibirTarefas" @ExibirTarefas='ExibirTarefas'></app-botao>
          <app-botao prop_id="TarefasAtrasadas" prop_size="md" prop_icon="assignment_late" prop_title="Tarefas atrasadas" prop_disabled prop_event_emitido="ExibirTarefasAtrasadas" @ExibirTarefasAtrasadas='ExibirTarefasAtrasadas'></app-botao>
          <app-botao prop_id="FaturaMes" prop_size="md" prop_icon="assessment" prop_title="Fatura no mês" prop_disabled prop_event_emitido="ExibirFaturaMes" @ExibirFaturaMes="ExibirFaturaMes"></app-botao>
          <app-botao prop_id="Mensagens" prop_size="md" prop_icon="mail_outline" prop_title="Mensagens" prop_event_emitido="ExibirMensagem" @ExibirMensagem="ExibirMensagem"></app-botao>

          <q-btn dense rounded size="md" icon="exit_to_app" color="blue-grey-6" title="Sair" @click="sair" />
      </q-card-actions>
    </q-card>

  </div>
</template>

<script>
import appBotao from '../atomicos/botao'

  export default{
    components:{
      appBotao
    },
    props:{
      nome: {type: String, required: true, default: 'Usuário logado'},
      cargo: {type: String, required: true, default: 'Cargo do usuário'}
    },
    data (){
      return{
        mesagem:'Nenhuma mensagem encontrada',
        showing: false
      }
    },
    methods:{
      sair(){
        this.$q.dialog({
                color:'blue-grey-6',
                title: 'Sair',
                message: 'Deseja sair da aplicação?',
                ok: true,
                cancel: true,
                preventClose: true
              }).then(() => {
                  //Fechar a aplicação
                  this.$router.push('/');
                  //   this.$q.notify('You said OK!')
              }).catch(() => {
                this.$q.notify(`Legal!!! Você preferiu permanece.`)
              })
      },
      PaginaInicial (){
        this.$router.push('/');
      },
      ExibirTarefas (){
        console.log("...evento ExibirTarefas recebida.");
      },
      ExibirTarefasAtrasadas (){
        console.log("...evento ExibirTarefasAtrasadas recebida.");
      },
      ExibirFaturaMes (){
        console.log("...evento ExibirFaturaMes recebida.");
      },
      ExibirMensagem (){
        console.log("...evento ExibirMensagem recebida.");
      }
    }
  }

</script>

<style> </style>
