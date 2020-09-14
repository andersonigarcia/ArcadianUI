<template>
  <div class="row q-col-gutter-md">
    <q-input class="col-xs-6 col-sm-6"  outlined dense v-model="caixa" label="Caixa" input-style="text-align:right;" :rules="[ val => val && val.length > 0  || 'Informe número da caixa']" stack-label/>
    <q-select class="col-xs-6 col-sm-6"  dense outlined v-model="corCaixa" :options="options" label="Cor da caixa" :rules="[ corCaixa !== null && corCaixa !== '' || 'Informe a cor da caixa']" stack-label>
      <template v-slot:prepend>
        <q-icon :color="cor" name="inbox" />
      </template>
    </q-select>
  </div>
</template>

<script>
import StateMixin from 'mixins/comum/state'

export default {
  name: 'CaixaImput',
  mixins: [StateMixin],
  data () {
    return {
      options: [{ id: 'Amarela', label: 'Amarela' },
        { id: 'Azul', label: 'Azul' },
        { id: 'Branca', label: 'Branca' },
        { id: 'Verde', label: 'Verde' },
        { id: 'Vermelha', label: 'Vermelha' }]
    }
  },
  computed: {
    caixa: {
      get () { return this.getState('caixa') },
      set (value) { this.setState('caixa', value) }
    },
    cor () {
      // TODO trocar para as variaveis globais em quasar.variables.styl
      switch (this.corCaixa) {
        case 'Amarela': return 'warning'
        case 'Azul': return 'info'
        case 'Branca': return 'grey-5'
        case 'Verde': return 'positive'
        case 'Vermelha': return 'negative'
        default: return 'grey-5'
      }
    },
    corCaixa: {
      get () { return this.getState('caixa_cor') },
      set (value) { this.setState('caixa_cor', value.id) }
    }
  }
}
</script>
