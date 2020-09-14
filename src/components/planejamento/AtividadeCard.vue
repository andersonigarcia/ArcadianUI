<template>
  <atividade-strip :card="card" @click="atividadeClicked">
    <q-btn v-if="isPlanejamento" class="col-auto q-mr-sm" flat round size="sm" color="brand-1" icon="delete" @click.stop="deleteClicked"/>
    <confirmation-dialog v-if="confirmationDialogVisible" :visible="confirmationDialogVisible" :message="confirmationDialogMessage" @option="atividadeDelete" @hide="confirmationDialogVisible = false"/>
    <atividade-dialog v-if="atividadeDialogVisible" :visible="atividadeDialogVisible" :card="card" @option="atividadeEdited" @hide="atividadeDialogVisible = false"/>
  </atividade-strip>
</template>

<script>
export default {
  name: 'AtividadeCard',

  data () {
    return {
      confirmationDialogVisible: false,
      confirmationDialogMessage: '',
      atividadeDialogVisible: false
    }
  },

  props: {
    card: { type: Object, required: true }
  },

  computed: {
    isPlanejamento () {
      return this.card.status_tipo === 'Planejamento'
    }
  },

  methods: {
    atividadeClicked () {
      // this.card.execucao_id
      //   ? this.$router.push(`/planejamentos/atividades/${this.card.execucao_id}`)
      //   : this.$router.push(`/planejamentos/atividades/${this.card.planejamento_id}/${this.card.atividade_id}`)
      if (['Planejamento', 'Inicial'].indexOf(this.card.status_tipo) < 0) return this.$app.warn(`Atividade já se encontra ${this.card.status_nome}! Não é permitido alterar as informações!`)
      this.atividadeDialogVisible = true
    },

    deleteClicked () {
      this.confirmationDialogMessage = `Confirma a exclusão da atividade <b>${this.card.atividade_nome}</b>?`
      this.confirmationDialogVisible = true
    },

    atividadeDelete (e) {
      if (e === 'cancel') return
      // TODO action para excluir o plano-execucao
      alert(e)
    },

    atividadeEdited (e) {
      if (e.action === 'cancel') return
      // TODO action para atualizar data e hora
      console.log(e)
    }
  }
}
</script>
