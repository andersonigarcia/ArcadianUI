<template>
  <div class="q-mt-xs">
    <q-list class="rounded-borders text-brand-5">
      <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle default-opened expand-icon-toggle>
        <template v-slot:header>
          <q-icon class="q-mr-sm c-add-btn text-brand-5" size="21px" name="attach_money" @click.stop="novo"/>
          <q-item-section> Valores </q-item-section>
        </template>
        <q-toggle dense v-model="acrescimo" :label="ajustePercentualLabel" color="amber" :false-value="false" :true-value="true" :disable="existeServico"/>
        <div class="row q-pa-sm q-col-gutter-md">
          <currency-input ref="elAjustePercentual" v-model="ajustePercentual" class="col-xs-6 col-sm-4" :maxlength="5" :disable="existeServico" :label="`${ajustePercentualLabel} %`" inputClass="text-brand-3"/>
          <currency-input ref="elValorCobrado" v-model="valorCobrado" class="col-xs-6 col-sm-4" :maxlength="10" :disable="existeServico" label="Valor Cobrado R$" inputClass="text-brand-3"/>
          <currency-input :value="ajusteValor" class="col-xs-12 col-sm-4" :label="`${ajustePercentualLabel} R$`" :disable="true"/>
        </div>
        <div class="row q-pa-sm q-col-gutter-md">
        </div>
         <div class="row" v-show="memoriaDeCalculo.length > 0">
            <!--memoria-calculo :memoria="memoriaDeCalculo"/-->
         </div>
      </q-expansion-item>
    </q-list >
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import state from 'mixins/comum/state'
import { VMoney } from 'v-money'
import number from 'utils/number'
const precision = 2

export default {
  mixins: [state],
  directives: { money: VMoney },
  data () {
    return {
      moneyConfig: {
        decimal: ',',
        thousands: '.',
        precision: precision,
        masked: false
      },
      initialising: false,
      editingAjuste: false,
      editingValor: false,
      editingAcrescimo: false,
      acrescimo: false,
      ajustePercentualData: 0,
      ajustePercentual: 0,
      valorCobradoData: 0,
      valorCobrado: 0,
      ajusteValor: 0
    }
  },
  computed: {
    existeServico () {
      return !this.$store.state.OrdemServico.state.servicos
    },
    ajustePercentualLabel () {
      return this.acrescimo ? 'Acréscimo' : 'Desconto'
    },
    valorBase () {
      return (this.$store.state.OrdemServico.state.servicos || []).reduce((a, b) => a + b.valor_cobrado, 0)
    },
    memoriaDeCalculo () {
      return this.$store.state.OrdemServico.state.valores || []
    }
  },
  watch: {
    valorCobrado: function (val, old) {
      if (this.initialising || this.editingAjuste) return
      console.log('valorCobrado', val, old)
      this.editingValor = true
      this.valorCobradoData = number.toNumber(val)
      if (!this.editingAcrescimo) this.acrescimo = this.valorCobradoData > this.valorBase
      this.updateAjustePercentual()
      this.updateAjusteValor()
      this.$nextTick(function () { this.editingValor = false })
    },
    ajustePercentual: function (val, old) {
      if (this.initialising || this.editingValor) return
      console.log('ajustePercencual', val, old)
      this.editingAjuste = true
      this.ajustePercentualData = number.toNumber(val)
      this.updateValorCobrado()
      this.updateAjusteValor()
      this.$nextTick(function () { this.editingAjuste = false })
    },
    acrescimo: function (val, old) {
      if (this.initialising || this.editingValor || this.editingAjuste) return
      console.log('acrescimo', val, old)
      this.editingAcrescimo = true
      if (val === false && this.ajustePercentualData > 100) {
        this.$refs.elAjustePercentual.setInputValue('0,00')
      } else {
        this.valorCobrado = this._normalize(number.round(
          val
            ? this.valorBase * (1 + this.ajustePercentualData / 100)
            : this.valorBase * (1 - this.ajustePercentualData / 100)
          , precision))
        this.$refs.elValorCobrado.setInputValue(this.valorCobrado)
      }
      this.$nextTick(function () { this.editingAcrescimo = false })
    }
  },
  created () {
    this.initialising = true

    // os campos chave dos calculos são o valorCobrado e valorBase, os demais sao calculados a partir destes 2
    // os valorCobradoData e ajustePercentualData preservam tantas casas decimais quanto possivel
    // os valorCobrado e ajustePercentual são usados para apresentacao dos valores e tela, sofrem arredondamento conforme a precisao utilizada

    this.valorCobradoData = this.getState('valor_cobrado')
    this.acrescimo = this.valorCobradoData > this.valorBase

    this.setValorCobrado()
    this.updateAjustePercentual()
    this.updateAjusteValor()

    this.$nextTick(function () { this.initialising = false })
  },
  methods: {
    ...mapActions('OrdemServico', ['setPropOrdemServico']),
    setValorCobrado () {
      this.valorCobrado = this._normalize(this.valorCobradoData)
      if (this.$refs.elValorCobrado) this.$refs.elValorCobrado.setInputValue(this.valorCobrado)
    },
    updateValorCobrado () {
      this.valorCobradoData = number.round(this.valorBase * (1 + this.ajustePercentualData * (this.acrescimo ? 1 : -1) / 100), precision) || 0
      this.setValorCobrado()
      this.setState('valor_cobrado', this.valorCobradoData)
    },
    updateAjustePercentual () {
      this.ajustePercentualData = (this.valorCobradoData - this.valorBase) * (this.acrescimo ? 1 : -1) / this.valorBase * 100 || 0
      this.ajustePercentual = this._normalize(this.ajustePercentualData, precision)
      if (this.$refs.elAjustePercentual) this.$refs.elAjustePercentual.setInputValue(this.ajustePercentual)
    },
    updateAjusteValor () {
      this.ajusteValor = this._normalize((this.valorCobradoData - this.valorBase) * (this.acrescimo ? 1 : -1), precision) || '0.00'
    },
    // para v-money funcionar é necessario que o valor possua as casas decimais do contrario ele rouba os digitos e considera como decimal
    _normalize (v) {
      v = number.round(v, precision)
      return v.toFixed(precision).replace('.', ',')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .c-margin-titulo {
    margin-top: 3px;
  }
  .c-add-btn {
    @extend .c-margin-titulo;
    margin-left: -5px;
    position: relative;
    z-index: 100;
  }

</style>
