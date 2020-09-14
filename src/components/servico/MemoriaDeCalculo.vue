<template>
  <div class="col q-pa-sm">
    <q-list bordered class="col q-pa-sm c-border-radius">
      <q-item-label class="a-text-caption-lg q-mb-md">Memória de Cálculo</q-item-label>
      <q-item-label class="a-text-caption-md a-text-dense" v-for="(item, index) in memoria" :key="index">{{ `* ${item}` }}</q-item-label>
    </q-list>
  </div>
</template>

<script>
import number from 'utils/number'

const vl = (v) => v > 0 || v < 0
const fmt = number.formatPtBr
const pct = number.formatDecimal

export default {

  props: {
    valorTabelaProduto: { type: Number, default: 0 },
    valorTabelaCliente: { type: Number, default: 0 },
    ajustePercentualCliente: { type: Number, default: 0 },
    quantidadeItens: { type: Number, default: 0 },
    valorCobrado: { type: Number, default: 0 }
  },

  computed: {
    multiplicador () {
      return this.quantidadeItens > 1 ? this.quantidadeItens : 1
    },
    valorTabelaConsiderado () {
      return vl(this.valorTabelaCliente) ? this.valorTabelaCliente : this.valorTabelaProduto
    },
    valorAjustePercentualCliente () {
      return vl(this.ajustePercentualCliente) ? this.valorTabelaConsiderado * this.ajustePercentualCliente / 100 : 0
    },
    valorBase () {
      return this.valorTabelaConsiderado + this.valorAjustePercentualCliente
    },
    valorAjustePercentual () {
      return vl(this.valorBase) ? this.valorCobrado / this.multiplicador - this.valorBase : 0
    },
    ajustePercentual () {
      return vl(this.valorBase) ? this.valorAjustePercentual * 100 / this.valorBase : 0
    },
    memoria () {
      let memoria = []

      if (vl(this.valorTabelaProduto)) {
        memoria.push(`Valor tabelado do produto ${fmt(this.valorTabelaProduto)}`)
      }

      if (vl(this.valorTabelaCliente)) {
        memoria.push(`Valor do produto na tabela do cliente ${fmt(this.valorTabelaCliente)}`)
      }

      if (vl(this.valorAjustePercentualCliente)) {
        if (this.ajustePercentualCliente < 0) {
          memoria.push(`Desconto geral de ${pct(this.ajustePercentualCliente * -1)}% (${fmt(this.valorAjustePercentualCliente * -1)}) definido no cadastro do cliente`)
        }

        if (this.ajustePercentualCliente > 0) {
          memoria.push(`Acréscimo geral de ${pct(this.ajustePercentualCliente)}% (${fmt(this.valorAjustePercentualCliente)}) definido no cadastro do cliente`)
        }
      }

      if (vl(this.valorAjustePercentual)) {
        if (this.ajustePercentual < 0) {
          memoria.push(`Desconto de ${pct(this.ajustePercentual * -1)}% (${fmt(this.valorAjustePercentual * -1)}) aplicado neste serviço`)
        }

        if (this.ajustePercentual > 0) {
          memoria.push(`Acréscimo de ${pct(this.ajustePercentual)}% (${fmt(this.valorAjustePercentual)}) aplicado neste serviço`)
        }
      }

      memoria.push(`Valor unitário ${fmt(this.valorCobrado / this.multiplicador)}`)

      memoria.push(`Total do serviço ${fmt(this.valorCobrado)} = (${this.multiplicador} * ${fmt(this.valorCobrado / this.multiplicador)})`)

      return memoria
    }
  }

}
</script>

<style>
  .c-border-radius {
    border-radius: 6px;
  }
</style>
