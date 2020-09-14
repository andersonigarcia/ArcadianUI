<template>
  <q-page class="bg-white">
    <form @submit.prevent="submit" @reset.prevent.stop="onReset">
      <q-select outlined v-model="produto" :options="produtoOptions" label="Selecione o produto" class="col-xs-12 col-grow a-text-dense q-ma-sm" input-debounce="0" use-input dense hide-selected options-dense fill-input @input="selectProduto" @filter="filterProduct" lazy-rules :rules="[val => val || 'Selecione o produto']" hide-bottom-space ref="selectProduto" >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
          </q-item>
        </template>
      </q-select>
      <span v-if="isItens" class="q-ml-sm a-text-dense-xs text-italic text-brand-5">Alteração do produto resultará na remoção dos elementos</span>
      <odontograma v-if="exigeOdontograma" @incluirElemento="incluirElemento" ref="odontograma"/>
      <div v-if="isItens" class="row q-mt-md">
        <q-list class="rounded-borders text-brand-5 col-grow">
          <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle default-opened expand-icon-toggle @input="calcularTotalCobrado">
            <template v-slot:header>
              <q-item-section>Relação de elementos</q-item-section>
            </template>
            <div v-for="(item, index) in this.stateServicoItens" :key="item.id">
              <q-item dense class="bg-white q-col-gutter-x-md">
                <q-item-section class="col-sm-11">
                  <q-item-label caption class="a-text-dense a-lh-xs"> {{ comporDescricaoElemento(item) }} </q-item-label>
                </q-item-section>
                <q-item-section class="on-rigth col-grow">
                  <div>
                    <q-btn class="c-btn-del" dense flat icon="delete" size="sm" @click="deletarElemento(index, item.elemento)"/>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator inset/>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
      <q-card class="q-ma-sm q-pa-sm" flat bordered round>
        <div class="row q-col-gutter-x-md">
          <currency-input v-model="percentualAjuste" :maxlength="5" class="col-sm-6 col-grow" label="Ajuste %" @input="calcularTotalCobrado" :rules="[]"/>
          <currency-input v-model="valorTotal" readonly :maxlength="15" class="col-sm-6 col-grow" label="Total do serviço" :rules="[]"/>
          <span v-if="valorProduto > 0" class="text-brand-5 a-text-dense-sm">{{this.msgProduto}}</span>
          <span v-if="valorProduto === 0" class="text-brand-5 a-text-dense-sm">**Atenção: Atualize o valor no cadastro de produtos</span>
        </div>
      </q-card>
      <div class="q-ma-sm a-text-dense text-brand-5">
         <q-checkbox class="q-my-sx" dense v-model="isRepeticao" label="É uma repetição de trabalho" color="brand-2" />
         <q-card class="row q-mt-xs q-pa-sm" v-if="isRepeticao" flat bordered round>
          <span class="col-xs-2" >Motivo: </span>
          <q-radio class="col-xs-3" dense v-model="origemProblema" val="cliente" label="Cliente" color="brand-2" />
          <q-radio class="col-xs-3" dense v-model="origemProblema" val="laboratorio" label="Laboratório" color="brand-2"/>
         </q-card>
      </div>
      <div class="q-ma-sm">
        <q-checkbox v-model="precisaMaterialExtra" label="Necessita de material" class="q-mb-sm a-text-dense text-brand-5" color="brand-2" dense/>
           <q-input v-if="precisaMaterialExtra" v-model="descricaoMaterialExtra" label="Descreva o material necessário:" stack-label outlined dense :rules="[val => val !== '' && val.length > 3 && val !== undefined  || 'Informe o material necessário']" hide-bottom-space/>
      </div>
      <q-card v-if="isValores" class="col q-pa-sm q-ma-sm" flat bordered round>
        <q-item-label class="a-text-caption-lg q-mb-md">Base de cáluclo</q-item-label>
        <div v-for="item in stateServicoValores" :key="item.id">
          <q-item-label class="a-text-caption-md a-text-dense text-brand-5">{{ item }}</q-item-label>
        </div>
      </q-card>
      <memoria-de-calculo
        :valor-tabela-produto="stateServicoValores.valor_tabela_produto"
        :valor-tabela-cliente="stateServicoValores.valor_tabela_cliente"
        :ajuste-percentual-cliente="stateServicoValores.ajuste_percentual_cliente"
        :quantidade-itens="stateServicoValores.quantidade_itens"
        :valor-cobrado="stateServicoValores.valor_cobrado"
      />
      <div class="q-ma-sm">
        <q-input v-model="observacaoServico" label="Observação:" stack-label outlined dense hide-bottom-space/>
      </div>
      <save-buttons :submitting="submitting" :disableConfirmar="valorProduto === 0" lblConfirmar="Confirmar"/>
    </form>
  </q-page>
</template>

<script>
import FormMixin from 'mixins/comum/form'
import state from 'mixins/comum/state'
import validate from 'mixins/comum/validate'
import number from 'utils/number'
import { mapActions } from 'vuex'
const nameModule = 'Servico'
const nameStateServico = 'servico'

export default {
  name: 'Servico',
  mixins: [FormMixin, state, validate],
  props: {
    modo: { type: String, default: 'new' },
    module: { type: String, default: nameModule },
    state: { type: String, default: nameStateServico },
    servicoId: { type: String, default: '0' }
  },
  data () {
    return {
      exigeOdontograma: false,
      listaBaseProdutos: [],
      produtoOptions: [],
      valorProduto: 0
    }
  },
  computed: {
    descricaoMaterialExtra: {
      get () { return this.getState('descricao_materialExtra') },
      set (value) { this.setState('descricao_materialExtra', value) }
    },
    isItens () { return this.stateServicoItens.length > 0 },
    precisaMaterialExtra: {
      get () { return !!this.getState('precisa_materialExtra') },
      set (value) { this.setState('precisa_materialExtra', value) }
    },
    isRepeticao: {
      get () { return !!this.getState('is_repeticao') },
      set (value) { this.setState('is_repeticao', value) }
    },
    isValores () { return this.stateServicoValores.length > 0 },
    stateServicoItens () { return this.stateServico.itens || [] },
    msgProduto () { return ('Valor base do produto ').concat(this.formatReal(this.valorProduto)) },
    observacaoServico: {
      get () { return this.getState('observacao_servico') },
      set (value) { this.setState('observacao_servico', value) }
    },
    origemProblema: {
      get () { return this.getState('origem_problema') },
      set (value) { this.setState('origem_problema', value) }
    },
    percentualAjuste: {
      get () { return String(this.getState('ajuste_percentual') || 0) },
      set (value) { this.setState('ajuste_percentual', value) }
    },
    produto: {
      get () { return this.listaBaseProdutos.filter(v => v.value === this.getState('produto_id'))[0] },
      set (value) {
        this.setState('produto_id', value.value || '')
        this.setState('produto_nome', value.nome || '')
        this.setState('categoria_nome', value.categoria || '')
      }
    },
    produtoState () { return this.$store.state.Produto.state },
    valorTotal: {
      get () { return String(this.getState('valor_cobrado') || 0) },
      set (value) { this.setState('valor_cobrado', value) }
    },
    stateServico () { return this.$store.state.Servico.state },
    stateServicoValores () { return this.stateServico.valores || [] }
  },
  mounted () {
    this.$q.loading.show()
    this.$nextTick(() => this.onLoad())
    this.$q.loading.hide()
  },
  methods: {
    ...mapActions('Servico', ['getServicosProdutos', 'getServicosId', 'setEmptyElementState', 'removeElementState', 'addOrUpdateObjectState']),
    ...mapActions('Produto', ['getProdutosId']),
    ...mapActions('OrdemServico', ['setServicoInOrdemServico']),

    calcularTotalCobrado () {
      let total = this.isItens ? this.valorProduto * this.stateServicoItens.length : (this.exigeOdontograma ? 0 : this.valorProduto)
      let ajuste = (Math.abs(number.toNumber(this.percentualAjuste)) / 100) * number.toNumber(total)
      return total - ajuste
    },
    comporDescricaoElemento (item) {
      let descricaoElementos = `${item.elemento} (${item.terco_cervical_cor},${item.terco_medio_cor},${item.terco_incisal_cor})`
      let descricaoSubstrato = (` | ${item.substrato_tipo}`).concat(item.substrato_cor === '' ? ' |' : `(${item.substrato_cor}) | `)
      let descricaoTextura = item.textura
      return descricaoElementos.concat(descricaoSubstrato).concat(descricaoTextura)
    },
    deletarElemento (index, elemento) {
      this.$refs.odontograma.alterIcon(String(elemento).substr(0, 1), String(elemento).substr(1, 1), false)
      this.removeElementState({ state: 'itens', index: index })
      this.calcularTotalCobrado()
    },
    async filterProduct (value, update) {
      value === ''
        ? update(() => { this.produtoOptions = this.listaBaseProdutos })
        : update(() => { this.produtoOptions = this.listaBaseProdutos.filter(v => v.label.toLowerCase().includes(value.toLowerCase())) })
    },
    formatReal (val) {
      return number.formatPtBr(val)
    },
    async getListProdutos () {
      let data = await this.getServicosProdutos()
      if (!data.success) return
      this.listaBaseProdutos = data.produtos.map(item => ({
        label: `${item.categoria_nome}: ${item.produto_nome}`,
        value: item.produto_id,
        nome: item.produto_nome,
        categoria: item.categoria_nome,
        odontograma: item.produto_metadata === 'Odontograma' }))
    },
    getPostDetalhesElemento (el) {
      let obj = {}
      if (this.modo === 'edit') { obj.id = el.id }
      obj.elemento = el.elemento
      obj.substrato_tipo = el.substrato_tipo
      obj.substrato_cor = el.substrato_cor
      obj.terco_cervical_cor = el.terco_cervical_cor
      obj.terco_medio_cor = el.terco_medio_cor
      obj.terco_incisal_cor = el.terco_incisal_cor
      obj.textura = el.textura
      obj.observacao = el.observacao
      return obj
    },
    getPostElementos () {
      let elementos = []
      this.stateServicoItens.forEach(element => {
        elementos.push(this.getPostDetalhesElemento(element))
      })
      return elementos
    },
    getPostServico () {
      let servico = {}
      if (this.modo === 'edit') { servico.servico_id = this.servicoId }
      servico.ordem_servico_id = ''
      servico.produto_id = this.stateServico.servico.produto_id
      servico.produto_nome = this.stateServico.servico.produto_nome
      servico.categoria_nome = this.stateServico.servico.categoria_nome
      servico.valor_cobrado = this.stateServico.servico.valor_cobrado
      servico.ajuste_percentual = Math.abs(number.unformat(this.stateServico.servico.ajuste_percentual))
      servico.itens = this.getPostElementos()

      servico.is_trabalho = this.stateServico.servico.is_repeticao || false
      servico.origem_problema = this.stateServico.servico.origem_problema || ''
      servico.precisa_material = this.stateServico.servico.precisa_materialExtra || false
      servico.descricao_material = this.stateServico.servico.descricao_materialExtra || ''
      servico.quantidade_itens = this.stateServicoItens.length
      return servico
    },

    async getServicoEdit () {
      if (this.modo === 'new') return
      await this.getServicosId(this.servicoId)
    },
    incluirElemento (e) {
      this.addOrUpdateObjectState({ name: 'itens', item: e, vm: this })
      this.calcularTotalCobrado()
    },
    async onLoad () {
      await this.getListProdutos()
      await this.getServicoEdit()
      if (String(this.servicoId) !== String(0)) {
        await this.getProdutosId(this.stateServico.servico.produto_id)
        this.valorProduto = this.produtoState.valor.valor
      }
      if (!this.stateServico.itens) {
        this.$set(this.$store.state.Servico.state, 'itens', [])
      }
    },
    onReset () { this.$router.go(-1) },
    restart () {
      this.setEmptyElementState({ name: 'itens', value: [] })
      this.setEmptyElementState({ name: 'valores', value: [] })
      this.percentualAjuste = 0
      this.exigeOdontograma ? this.valorTotal = 0 : this.valorTotal = this.valorProduto
      this.origemProblema = ''
      this.descricaoMaterialExtra = ''
      this.precisaMaterialExtra = false
      this.isRepeticao = false
    },
    async selectProduto (produto) {
      await this.getProdutosId(produto.value)
      this.valorProduto = this.$store.state.Produto.state.valor ? this.$store.state.Produto.state.valor.valor : 0
      this.exigeOdontograma = produto.odontograma
      this.restart()
    },
    send () {
      let servico = this.getPostServico()
      this.setServicoInOrdemServico({ name: 'servicos', data: servico })
      this.$router.go(-1)
      // alert(JSON.stringify(servico))
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit(`Servico/CLEAR_STATE_ROOT`)
    next()
  }
}
</script>

<style scoped>
</style>
