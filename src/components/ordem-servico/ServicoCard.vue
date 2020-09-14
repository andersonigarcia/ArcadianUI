<template>
  <div>
    <q-list class="rounded-borders text-brand-5 ">
      <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle label=" Serviço(s)" default-opened @click="novo" expand-icon-toggle>
        <template v-slot:header>
          <q-icon class="q-mr-sm c-add-btn text-brand-5" size="21px" name="add" @click.stop="novo"/>
          <q-item-section> Serviço(s)</q-item-section>
        </template>
        <div v-for="(servico, index) in this.servicos" :key="index">
          <q-item clickable v-ripple dense @click="editar(servico)" class="bg-white shadow-1">
            <q-item-section class="col-7">
              <q-item-label caption class="a-text-dense a-lh-xs" >{{servico.categoria_nome.concat(' - ', servico.produto_nome)}}</q-item-label>
            </q-item-section>
            <q-separator inset vertical/>
            <q-item-section side class="on-left">
              <q-item-label caption class="a-text-dense a-lh-xs">{{servico.quantidade_itens}}</q-item-label>
            </q-item-section>
            <q-separator inset vertical/>
            <q-item-section side>
              <q-item-label caption class="a-text-dense a-lh-xs" >{{formatValor(servico.valor_cobrado, servico.ajuste_percentual)}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset v-if="index < totalServicos -1 "/>
        </div>
      </q-expansion-item>
    </q-list>

    <servico-dialog :visible="servicoDialogVisible" message="Especificação do serviço" @option="confirmatioDialog" @hide="servicoDialogVisible = false" default="ok" :idServico="idServico"/>

  </div>
</template>

<script>
import number from 'utils/number'

export default {
  name: 'ServicoCard',
  props: { servicos: Array },
  data () {
    return {
      totalServicos: this.servicos.length,
      idServico: '',
      servicoDialogVisible: false
    }
  },
  methods: {
    async editar (data) {
      this.idServico = data.servico_id
      this.servicoDialogVisible = true
    },
    formatValor (v, p) {
      let descPerc = Number(p) !== 0 ? `(${p}%)` : ''
      return `${number.formatPtBr(v, 2)}${descPerc}`
    },
    novo (id) {
      this.idServico = ''
      this.servicoDialogVisible = true
    },
    confirmatioDialog () {}
  }
}
</script>

<style lang="stylus" scoped>
  .c-add-btn {
    margin-top: 3px;
    margin-left: -5px;
    position: relative;
    z-index: 100;
  }
</style>
