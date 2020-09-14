<template>
  <div>
    <q-card flat bordered class="q-mt-sm">
      <q-card-section>
        <span class="a-text-dense-sm">Percentual de ajuste global</span>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <currency-input v-model="ajustePercentual" mask="##.##" label="% aplicado a todos os serviços (Ex: 02.00)" class="col-sm-3 col-grow a-text-dense a-lh-xs"/>

        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-sm">
      <q-card-section>
        <span class="a-text-dense-sm">Desconto por produto</span>
      </q-card-section>
      <q-card-section>
        <div class="row">
        <q-select outlined v-model="selectedItem" label="Selecione um produto"  class="col-grow a-text-dense" input-debounce="0" use-input dense options-dense :options="options" hide-selected @filter="filter" @input="add" ref="selectProduto">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
            </q-item>
          </template>
        </q-select>
        </div>

        <div class="row q-mt-md">
          <q-list class="rounded-borders text-brand-5 col-grow">
            <q-expansion-item dense header-class="bg-grey-2" expand-icon-class="text-grey-7" dense-toggle default-opened>
              <template v-slot:header>
                <div class="q-mr-md c-add-btn text-brand-5">{{ totalProdutos }}</div>
                <q-item-section>Produtos com desconto </q-item-section>
              </template>

              <div v-for="(produto, index) in this.produtos" :key="produto.produto_id" >
                <q-item  dense class="bg-white">
                  <q-item-section class="col-6">
                    <q-item-label caption class="a-text-dense a-lh-xs">{{produto.produto_nome}}</q-item-label>
                  </q-item-section>
                  <q-separator vertical/>

                  <q-item-section side class="on-left">
                    <currency-input :value="String(produtos[index].valor)" :maxlength="10" class="a-text-dense a-lh-xs col-grow" label="R$ (Ex: 1.000.00)" @focus="setItem(index, produto.produto_id)" @input="setValueState"/>
                  </q-item-section>

                  <q-item-section class="on-rigth" >
                    <div >
                      <q-btn class="c-btn-del" dense flat icon="delete" size="sm" @click="remove(index)"/>
                    </div >
                  </q-item-section >
                </q-item>
                <q-separator inset />
              </div>
            </q-expansion-item>
         </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script >
import { mapActions } from 'vuex'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import number from 'utils/number'

export default {
  name: 'CondicoesComerciaisGroup',
  mixins: [StateMixin, ValidateMixin],
  data () {
    return {
      options: [],
      data: [],
      item: { index: 0, id: 0 },
      produtos: [],
      selectedItem: '',
      produtosOrigem: ''
    }
  },
  computed: {
    ajustePercentual: {
      get () { return String(parseFloat(this.getState('ajuste_percentual')) || String(0)) },
      set (value) { parseFloat(this.setState('ajuste_percentual', value)) }
    },
    totalProdutos () { return this.produtos.length }
  },
  mounted () {
    this.getProdutos()
    this.produtos = this.$store.state.Cliente.state.produtos || []
  },
  methods: {
    ...mapActions('Cliente', ['removeElementState', 'pushState']),
    ...mapActions('Produto', ['getProdutosPreco']),

    async getProdutos () {
      let data = await this.getProdutosPreco()
      if (!data.success) return
      let produtosMap = data.produtos.map(prod => ({ label: `${prod.categoria_nome} - ${prod.produto_nome} (${number.formatPtBr(prod.valor)})`, value: prod.produto_id, valor: prod.valor, categoria: prod.categoria_id }))
      this.produtosOrigem = Array.from(produtosMap)
    },
    filter (value, update) {
      if (value === '') {
        update(() => { this.options = this.produtosOrigem })
        return
      }
      update(() => { this.options = this.produtosOrigem.filter(v => v.label.toLowerCase().includes(value)) })
    },
    add () {
      this.item.id = this.selectedItem.value
      if (!this.produtos.find(p => p.produto_id === this.item.id)) {
        let product = { produto_id: this.item.id, produto_nome: this.selectedItem.label, valor: String(this.selectedItem.valor) }
        this.pushState({ state: 'produtos', data: product })
        this.produtos = this.$store.state.Cliente.state.produtos
      }
    },
    remove (index) {
      this.removeElementState({ state: 'produtos', index: index })
      this.produtos = this.$store.state.Cliente.state.produtos
    },
    setItem (index, id) { this.item = { index: index, id: id } },
    setValueState (value) {
      let item = this.produtos.find(p => p.produto_id === this.item.id)
      item.valor = value
      this.setState(this.item.index, item, 'produtos')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
</style>
