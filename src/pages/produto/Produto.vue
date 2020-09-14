<template>
  <div v-if="loaded" class="q-gutter-y-sm q-ma-sm">
    <form @submit.prevent="submit" @reset.prevent.stop="onReset">
      <q-card flat bordered class="q-mt-sm">
        <q-card-section>
          <span class="a-text-dense-sm">Produto</span>
          <q-toggle label="Odontograma" class="col a-text-dense-xs absolute-right q-mr-md"  v-model="isOdontograma" false-value="Nenhum" true-value="Odontograma"></q-toggle>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-x-md">
              <q-input v-model="nome" type="text" outlined dense class="col-grow col-xs-12 col-md-12" label="Nome *" stack-label lazy-rules :rules="[ val => val && val.length > 3  || 'Nome não informado ou inválido']" ref="inputNome"/>
          </div>
          <div class="row q-col-gutter-x-md">
            <q-select outlined v-model="categoriaSelect" :options="optionsCategoria" option-label="categoria_nome" option-value="categoria_id" label="Selecione a categoria do produto" class="col-xs-12 col-grow a-text-dense" input-debounce="0" use-input dense hide-selected options-dense fill-input @filter="filterCategoria" lazy-rules :rules="[val => val || 'Selecione a categoria do produto']" ref="selectCategoria">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">Nenhum resultado foi encontrado</q-item-section>
                </q-item>
              </template>
            </q-select>
            <currency-input v-model="valor" :maxlength="10" class="col a-text-dense a-lh-xs" label="R$"/>
            </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-sm">
          <q-card-section>
            <span class="a-text-dense-sm">Templates associações ao produto</span>
          </q-card-section>
          <q-card-section>
            <div class="row">
            <q-select outlined v-model="workflowSelect" label="Selecione um template" class="col-grow a-text-dense" input-debounce="0" use-input dense options-dense :options="optionsWorkflow" hide-selected option-label="workflow_nome" option-value="workflow_nome" fill-input @filter="filterWorkflow" @input="add" clearable>

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
                    <div class="q-mr-md c-margin-total text-brand-5">{{ totalTemplates }}</div>
                    <q-item-section>Templates associados</q-item-section>
                  </template>
                  <draggable :list="this.templates" class="list-group" ghost-class="ghost" @start="dragging = true" @end="dragging = false">
                    <div v-for="(template, index) in this.templates" :key="template.workflow_id" >
                      <q-item  dense class="bg-white q-col-gutter-x-md">
                        <q-item-section class="col-sm-11">
                          <q-item-label caption class="a-text-dense a-lh-xs">{{template.workflow_nome}}
                            <q-icon class="text-brand-2 q-ml-lg" v-if="index === 0" name="done" size="1rem" title="Template atual"></q-icon>
                          </q-item-label>
                        </q-item-section>
                        <q-item-section class="on-rigth col-grow" >
                          <div >
                            <q-btn class="c-btn-del" dense flat icon="delete" size="sm" @click="remove(index)"/>
                          </div >
                        </q-item-section >
                      </q-item>
                      <q-separator inset />
                    </div>
                  </draggable>
                </q-expansion-item>
            </q-list>
            </div>
          </q-card-section>
        </q-card>

      <div class="q-mt-sm">
        <save-buttons :submitting="submitting" :disableConfirmar="!stateUnchanged"/>
      </div>

    </form>
    <confirmation-dialog :visible="dialogVisible" :message="dialogMessage" @option="confirmatioDialog" @hide="dialogVisible = false"/>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import number from 'utils/number'

import FormMixin from 'mixins/comum/form'
import StateMixin from 'mixins/comum/state'
import ValidateMixin from 'mixins/comum/validate'
import { mapActions } from 'vuex'

const nameModule = 'Produto'
const nameStateProduto = 'produto'
const nameStateValor = 'valor'
const nameStateWorkflow = 'workflows'
const pathList = '/produtos'

export default {
  name: 'Produto',
  components: { draggable },
  mixins: [FormMixin, StateMixin, ValidateMixin],
  props: {
    modo: { type: String, default: 'new' },
    module: { type: String, default: nameModule },
    state: { type: String, default: nameStateProduto }
  },
  data () {
    return {
      autoNumericModel: '',
      dialogMessage: 'Confirma a inclusão do colcaborador?',
      dialogVisible: false,
      dragging: false,
      listCategorias: [],
      listWorkflows: [],
      loaded: false,
      optionsCategoria: [],
      optionsWorkflow: [],
      templates: [],
      workflowSelect: ''
    }
  },

  computed: {
    categoriaSelect: {
      get () { return this.listCategorias.filter(v => v.categoria_id === this.getState('categoria_id'))[0] },
      set (value) { this.setState('categoria_id', value ? value.categoria_id : '') }
    },
    isOdontograma: {
      get () { return this.getState('metadata') || 'Nenhum' },
      set (value) { this.setState('metadata', value) }
    },
    nome: {
      get () { return this.getState('nome') },
      set (value) { this.setState('nome', value) }
    },
    valor: {
      get () { return String(this.getState('valor', 'valor')) },
      set (value) {
        let val = !this.getState('valor', 'valor') && value === '0,00' ? '' : number.toNumber(value)
        this.setState('valor', val, 'valor', Number)
      }
    },
    paramsId () { return this.$route.params.id },
    stateProduto () { return this.$store.state.Produto.state },
    stateUnchanged () { return this.isStateChanged(nameModule, nameStateProduto) || this.isStateChanged(nameModule, nameStateValor) || this.isStateChanged(nameModule, nameStateWorkflow) },
    totalTemplates () { return this.templates.length }
  },
  watch: {
    '$route': 'onRequest'
  },
  async mounted () {
    await this.onRequest()
  },
  methods: {
    ...mapActions('Categoria', ['getCategorias']),
    ...mapActions('Workflow', ['getWorkflows']),
    ...mapActions('Produto', ['getProdutosId', 'postProdutos', 'putProdutos', 'postProdutosWorkflow', 'pushState', 'removeElementState', 'getStateOriginal']),

    async getListWorkflow () {
      let data = await this.getWorkflows()
      if (!data.success) return
      // this.listWorkflows = data.workflows.map(work => ({ label: work.workflow_nome, value: work.workflow_id }))
      this.listWorkflows = data.workflows
    },
    async getListcategoria () {
      let data = await this.getCategorias()
      if (!data.success) return
      this.listCategorias = data.categorias
    },
    async onRequest () {
      this.loaded = false
      this.$q.loading.show()
      await this.getListWorkflow()
      await this.getListcategoria()
      if (this.paramsId) { await this.getProdutosId(this.paramsId) }
      this.templates = this.stateProduto.workflows || []
      this.$q.loading.hide()
      this.loaded = true
    },
    filterCategoria (value, update) {
      value === ''
        ? update(() => { this.optionsCategoria = this.listCategorias })
        : update(() => { this.optionsCategoria = this.listCategorias.filter(v => v.categoria_nome.toLowerCase().includes(value)) })
    },
    filterWorkflow (value, update) {
      value === ''
        ? update(() => { this.optionsWorkflow = this.listWorkflows })
        : update(() => { this.optionsWorkflow = this.listWorkflows.filter(v => v.workflow_nome.toLowerCase().includes(value)) })
    },
    async add () {
      if (this.workflowSelect === null || this.templates.find(p => p.workflow_id === this.workflowSelect.workflow_id)) return
      let workflow = { workflow_id: this.workflowSelect.workflow_id, workflow_nome: this.workflowSelect.workflow_nome }
      await this.pushState({ state: nameStateWorkflow, data: workflow })
      this.templates = this.stateProduto.workflows
    },
    remove (index) {
      this.removeElementState({ state: nameStateWorkflow, index: index })
      this.templates = this.stateProduto.workflows
    },
    async send () {
      if (!this.categoriaSelect.categoria_id) {
        this.$refs.selectCategoria.error = true
        return
      }

      let result = {}
      if (this.isStateChanged(nameModule, nameStateProduto) || this.isStateChanged(nameModule, nameStateValor)) {
        result = await this.sendProduto()
      }

      if ((!this.paramsId && !result.success)) return

      let produtoId = this.paramsId || result.produto.produto.id
      if (this.isStateChanged(nameModule, nameStateWorkflow)) {
        await this.sendTemplatesAssociados(produtoId)
      }

      if (this.modo === 'Cadastro') {
        await setTimeout(this.$router.replace({ name: 'editar_produto', params: { id: produtoId } }), 1300)
      }
    },
    async sendProduto () {
      let produto = { nome: this.nome,
        valor: number.toNumber(this.valor),
        ativo: true,
        categoria_id: this.categoriaSelect.categoria_id,
        metadata: this.isOdontograma }

      if (this.paramsId) {
        produto.id = this.paramsId
        return this.putProdutos({ obj: produto, itemNotify: nameStateProduto })
      }
      return this.postProdutos({ obj: produto, itemNotify: nameStateProduto })
    },
    mountPostWorkflow (produtoId) {
      let obj = { id: produtoId, workflows: [] }
      if (this.stateProduto.workflows && this.stateProduto.workflows.length > 0) {
        this.stateProduto.workflows.forEach((item, index) => { obj.workflows.push({ workflow_id: item.workflow_id, default: index === 0 }) })
      }
      return obj
    },
    async sendTemplatesAssociados (workflowId) {
      let postTemplates = this.mountPostWorkflow(workflowId)
      await this.postProdutosWorkflow({ obj: postTemplates, itemNotify: nameStateWorkflow })
    },
    confirmatioDialog (confirm) {
      confirm === 'cancel' ? void 0 : this[confirm]()
    },
    async ok () {
      this.$router.push(pathList)
    },
    onReset () {
      if (!this.stateUnchanged) {
        this.$router.push(pathList)
        return
      }
      this.dialogVisible = true
      this.dialogMessage = `Os dados alterados e não salvos serão perdidos. Confirma?`
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit(`Produto/CLEAR_STATE_ROOT`)
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .c-btn-del {
    float: right;
  }
  .c-margin-total {
    margin-top: 4px;
  }
</style>
