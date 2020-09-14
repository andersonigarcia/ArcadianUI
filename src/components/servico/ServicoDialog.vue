<template>
  <q-dialog v-model="show" v-on="$listeners" persistent v-close-popup :maximized="true" @before-show="initilize" transition-show="slide-left" transition-hide="slide-left" ref="servicoDialog" no-esc-dismiss>
       <q-card>
         <q-card-section>
          <q-icon class="col self-start q-mr-md" name="list" color="brand-1" size="2.2em"/>
          <span class="col self-center" v-html="message"></span>
        </q-card-section>
        <q-select outlined v-model="produto" :options="produtoOptions" label="Selecione o produto" class="col-xs-12 col-grow a-text-dense q-ma-sm" input-debounce="0" use-input dense hide-selected options-dense fill-input @filter="filterProduct" lazy-rules :rules="[val => val || 'Selecione o produto']" hide-bottom-space ref="selectProduto" >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
            </q-item>
          </template>
        </q-select>
        <span v-show="isItens" class="q-ml-sm a-text-dense-xs text-italic text-brand-5">Alteração do produto resultará na remoção dos elementos</span>
        <odontograma v-if="servico.exige_odontograma" @incluirElemento="incluirElemento" ref="odontograma" @hook:mounted="odontogramaMounted"/>
        <div v-if="isItens" class="row q-mt-md">
          <q-list class="rounded-borders text-brand-5 col-grow">
            <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle default-opened expand-icon-toggle >
              <template v-slot:header>
                <q-item-section>Relação de elementos</q-item-section>
              </template>
              <div v-for="(item, index) in this.itens" :key="item.elemento">
                <q-item dense class="bg-white q-col-gutter-x-md">
                  <q-item-section class="col-sm-11">
                    <q-item-label caption class="a-text-dense a-lh-xs"> {{ descricaoElemento(item) }} </q-item-label>
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
        <q-card class="q-ma-sm" flat bordered round>
          <div class="row q-col-gutter-x-md">
            <currency-input v-model="percentualAjuste" :maxlength="5" class="col-sm-6 col-grow" label="Ajuste %" :rules="[]" ref="percentualRef"/>
            <currency-input :value="totalServico" readonly :maxlength="15" class="col-sm-6 col-grow" label="Total do serviço" :rules="[]" ref="totalServicoRef"/>
            <!-- <span v-if="valorBaseProduto > 0" class="text-brand-5 a-text-dense-sm">{{`Valor base do produto` + this.formatReal(this.valorBaseProduto)}}</span> -->
            <span v-if="valorBaseProduto === 0" class="text-brand-5 a-text-dense-sm">**Atenção: Atualize o valor no cadastro de produtos</span>
          </div>
        </q-card>
        <div class="q-ma-sm a-text-dense text-brand-5">
          <q-checkbox class="q-my-sx" dense v-model="servico.is_repeticao" label="É uma repetição de trabalho" color="brand-2" />
          <q-card class="row q-mt-xs q-pa-sm" v-if="servico.is_repeticao" flat bordered round>
            <span class="col-xs-2" >Motivo: </span>
            <q-radio class="col-xs-3" dense v-model="servico.origem_problema" val="cliente" label="Cliente" color="brand-2" />
            <q-radio class="col-xs-3" dense v-model="servico.origem_problema" val="laboratorio" label="Laboratório" color="brand-2"/>
          </q-card>
        </div>
        <div class="q-ma-sm">
          <q-checkbox v-model="servico.precisa_material_extra" label="Necessita de material" class="q-mb-sm a-text-dense text-brand-5" color="brand-2" dense/>
            <q-input v-if="servico.precisa_material_extra" v-model="servico.descricao_materialExtra" label="Descreva o material necessário:" stack-label outlined dense :rules="[val => val !== '' && val.length > 3 && val !== undefined  || 'Informe o material necessário']" hide-bottom-space/>
        </div>
        <q-card v-if="isValores" class="col q-pa-sm q-ma-sm" flat bordered round>
          <q-item-label class="a-text-caption-lg q-mb-md">Base de cáluclo</q-item-label>
          <div v-for="item in valores" :key="item.id">
            <q-item-label class="a-text-caption-md a-text-dense text-brand-5">{{ item }}</q-item-label>
          </div>
        </q-card>
        <memoria-de-calculo
          :valor-tabela-produto="valores.valor_tabela_produto"
          :valor-tabela-cliente="valores.valor_tabela_cliente"
          :ajuste-percentual-cliente="valores.ajuste_percentual_cliente"
          :quantidade-itens="valores.quantidade_itens"
          :valor-cobrado="valores.valor_cobrado"
        />
        <div class="q-ma-sm">
          <q-input v-model="servico.observacao_servico" label="Observação:" stack-label outlined dense hide-bottom-space/>
        </div>
        <q-card-actions class="q-mr-sm" align="right">
          <q-btn label="confirmar" :color="defaultOk" @click="confirmarServico"/>
          <q-btn label="cancelar" :color="defaultCancel" :text-color="defaultOk" v-close-popup @click="servico.exige_odontograma = false"/>
        </q-card-actions>
      </q-card>

  </q-dialog>
</template>

<script>
import ConfirmationDialogMixin from 'mixins/comum/confirmation-dialog'
import FormMixin from 'mixins/comum/form'
import number from 'utils/number'
import validate from 'mixins/comum/validate'
import { mapActions } from 'vuex'

function ServicoBase (ajustePercentual = '0,00', categoriaNome, isRepeticao, precisaMaterialExtra, produtoId, produtoNome, quantidadeItens = 0, servicoId, valorCobrado = '0', exigeOdontograma) {
  this.ajuste_percentual = ajustePercentual
  this.produto_id = produtoId
  this.produto_nome = produtoNome
  this.valor_cobrado = valorCobrado

  this.categoria_nome = categoriaNome
  this.is_repeticao = !!isRepeticao
  this.precisa_material_extra = !!precisaMaterialExtra
  this.exige_odontograma = !!exigeOdontograma
}

export default {
  name: 'ServicoDialog',
  mixins: [ConfirmationDialogMixin, FormMixin, validate],
  props: {
    message: { type: String, default: '' },
    idServico: { type: String, default: '' }
  },
  data () {
    return {
      listaBaseProdutos: [],
      produtoOptions: [],
      servico: new ServicoBase(),
      itens: [],
      valores: {}
    }
  },
  computed: {
    isItens () {
      return this.itens.length > 0
    },
    isValores () { return this.valores.length > 0 },
    percentualAjuste: {
      get () { return String(this.servico.ajuste_percentual) },
      set (value) { this.servico.ajuste_percentual = value }
    },
    produto: {
      get () { return this.listaBaseProdutos.filter(v => v.value === this.servico.produto_id)[0] },
      async set (value) {
        this.resetValues()
        this.servico.produto_id = value.value || ''
        this.servico.produto_nome = value.nome || ''
        this.servico.categoria_nome = value.categoria || ''
        this.servico.exige_odontograma = value.odontograma
        await this.getProdutosId(value.value)
      }
    },
    produtoState () { return this.$store.state.Produto.state },
    servicoState () { return this.$store.state.Servico.state },
    totalServico () { return number.formatDecimal(this.calcularTotalCobrado()) },
    valorBaseProduto () { return this.produtoState.valor ? this.produtoState.valor.valor : 0 }
  },
  async mounted () {
    if (this.listaBaseProdutos.length === 0) {
      await this.getListProdutos()
    }
  },
  methods: {
    ...mapActions('Servico', ['addOrUpdateObjectState', 'getServicosId', 'getServicosProdutos', 'removeElementState', 'setEmptyElementState']),
    ...mapActions('Produto', ['getProdutosId']),

    appendText (args, comma = ',') {
      args = args.filter(function (el) { return el })
      return args.length > 0 ? args.reduce((a, c) => a.concat(comma).concat(c)) : ''
    },
    calcularTotalCobrado () {
      let total = this.isItens ? this.valorBaseProduto * this.itens.length : (this.servico.exige_odontograma ? 0 : this.valorBaseProduto)
      let ajuste = (Math.abs(number.toNumber(this.servico.ajuste_percentual)) / 100) * number.toNumber(total)
      return total - ajuste
    },

    confirmarServico () {
      // this.$emit('incluirServico', this.servico)
      // this.$router.go(-1)
      alert(JSON.stringify(this.servico))
    },

    deletarElemento (index, elemento) {
      this.$refs.odontograma.alterIcon(String(elemento).substr(0, 1) + String(elemento).substr(1, 1), false)
      this.itens.splice(index, 1)
    },
    descricaoElemento (item) {
      let descricao = this.appendText([item.terco_cervical_cor, item.terco_medio_cor, item.terco_incisal_cor])
      descricao = item.elemento + (descricao ? ' (' + descricao + ')' : descricao)
      return `${this.appendText([descricao, item.substrato_tipo, item.substrato_cor, item.textura], ' | ')}`
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
    incluirElemento (e) {
      this.addOrUpdateObjectState({ name: 'itens', item: e, vm: this })
    },
    async initilize () {
      this.$nextTick(async () => {
        this.resetValues()
        if (this.idServico === '') { return }

        this.$q.loading.show()
        await this.getServicosId(this.idServico)
        this.valores = this.servicoState.valores
        this.servico = Object.assign(this.servico, this.servicoState.servico)
        this.itens = JSON.parse(JSON.stringify(Object.assign(this.itens, this.itens, this.servicoState.itens)))
        this.servico.ajuste_percentual = number.formatDecimal(Math.abs(this.servico.ajuste_percentual))
        this.$refs.percentualRef.setInputValue(this.servico.ajuste_percentual)
        this.servico.exige_odontograma = this.valores.quantidade_itens > 0

        // TODO: Passar a buscar o preço do produto por cliente
        await this.getProdutosId(this.servico.produto_id)
        this.$q.loading.hide()
      })
    },
    odontogramaMounted () {
      if (!this.servico.exige_odontograma) return

      this.itens.forEach((item) =>
        this.$refs.odontograma.alterIcon(String(item.elemento).substr(0, 1) + String(item.elemento).substr(1, 1), true)
      )
    },
    async resetValues () {
      this.setEmptyElementState({ name: 'itens', value: [] })
      this.$store.commit(`Produto/CLEAR_STATE_ROOT`)
      this.$store.commit(`Servico/CLEAR_STATE_ROOT`)
      this.servico = new ServicoBase()
      this.itens = []
      this.valores = {}
      this.$refs.percentualRef.setInputValue('0,00')
    }
    // send () {
    //   // let servico = this.getPostServico()
    //   // this.setServicoInOrdemServico({ name: 'servicos', data: servico })
    //   this.$router.go(-1)
    //   // alert(JSON.stringify(servico))
    // }
  },
  beforeRouteLeave (to, from, next) {
    // this.$store.commit(`Servico/CLEAR_STATE_ROOT`)
    this.resetValues()
    next()
  }
}
</script>

<style scoped>
</style>
